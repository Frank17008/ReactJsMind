/**
 * 基于jsmind的React组件
 * https://gitee.com/314079846/jsmind/blob/master/docs/zh/3.operation.md
 */
import jsMind from 'jsmind';
import 'jsmind/draggable-node';
import 'jsmind/style/jsmind.css';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState, memo } from 'react';
import './index.scss';
import { JsMindDataType, JsMindInstance, JsMindProps, JsMindRefValue } from './interface';
import './screenshot';

const defaultOptions = {
  container: 'jsmind_container',
  editable: true,
  theme: 'primary',
  mode: 'full', // 显示模式 full 根节点两侧 / side 根节点右侧
  support_html: true, // 是否支持节点里的HTML元素
  view: {
    engine: 'canvas', // 思维导图各节点之间线条的绘制引擎
    hmargin: 100, // 思维导图距容器外框的最小水平距离
    vmargin: 50, // 思维导图距容器外框的最小垂直距离
    line_width: 2, // 思维导图线条的粗细
    line_color: '#555', // 思维导图线条的颜色
    line_style: 'curved', // 思维导图线条的样式，直线(straight)或者曲线(curved)
    custom_line_render: null, // 自定义的线条渲染方法
    draggable: false, // 当容器不能完全容纳思维导图时，是否允许拖动画布代替鼠标滚动
    hide_scrollbars_when_draggable: false, // 当设置 draggable = true 时，是否隐藏滚动条
    node_overflow: 'hidden', // 节点文本过长时的样式
    zoom: {
      // 配置缩放
      min: 0.5, // 最小的缩放比例
      max: 2.1, // 最大的缩放比例
      step: 0.1 // 缩放比例间隔
    },
    custom_node_render: null // 自定义的节点渲染方法
  },
  layout: {
    hspace: 30, // 节点之间的水平间距
    vspace: 20, // 节点之间的垂直间距
    pspace: 13, // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
    cousin_space: 0 // 相邻节点的子节点之间的额外的垂直间距
  },
  shortcut: {
    enable: true, // 是否启用快捷键
    handles: {}, // 命名的快捷键事件处理器
    mapping: {
      // 快捷键映射
      addchild: 45, // <Insert>
      addbrother: 13, // <Enter>
      editnode: 113, // <F2>
      delnode: 46, // <Delete>
      toggle: 32, // <Space>
      left: 37, // <Left>
      up: 38, // <Up>
      right: 39, // <Right>
      down: 40 // <Down>
    }
  }
};

const ReactJsMind = forwardRef<JsMindRefValue, JsMindProps>((props: JsMindProps, ref) => {
  const EVENT_TYPE = ['onClick', 'onMouseOver', 'onMouseOut', 'onMouseLeave', 'onKeyDown', 'onKeyUp', 'ondblClick', 'onContextMenu'];

  const jsMindRef = useRef<JsMindInstance | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef<Record<string, (e: Event) => void>>({});
  const [isReady, setIsReady] = useState<boolean>(false);

  const { data, options = {} } = props;

  useImperativeHandle(ref, () => {
    return {
      getInstance: () => jsMindRef.current,
      screenShot: () => jsMindRef?.current?.screenshot?.shoot(),
      getData: (format?): JsMindDataType => jsMindRef?.current?.get_data(format),
      getSelectedNode: (): JsMindDataType | null => jsMindRef?.current?.get_selected_node(),
      expandAll: () => jsMindRef?.current?.expand_all(),
      addNode: (parent_node, node_id, topic, data, direction): JsMindDataType | null =>
        jsMindRef?.current?.add_node(parent_node, node_id, topic, data, direction),
      removeNode: (node): boolean => !!jsMindRef?.current?.remove_node(node),
      updateNode: (nodeId, topic): void => jsMindRef?.current?.update_node(nodeId, topic),
      scrollNodeToCenter: (node) => jsMindRef?.current?.scroll_node_to_center(node),
      setNodeColor: (nodeId, bg_color, fg_color) => jsMindRef?.current?.set_node_color(nodeId, bg_color, fg_color),
      setNodeFontStyle: (nodeId, size, weight, style) => jsMindRef?.current?.set_node_font_style(nodeId, size, weight, style)
    };
  });

  const handleEvent = useCallback((e: Event, eventType: string) => {
    e?.preventDefault();
    const target = e.target as HTMLElement;
    const nodeId = target.getAttribute('nodeid');
    if (nodeId) {
      // 获取节点
      const node = jsMindRef.current?.get_node(nodeId);
      props?.[eventType]?.(node);
    }
  }, []);

  /**
   * 创建事件处理函数, 缓存函数地址
   */
  const createEventHandler = useCallback((eventType: string) => {
    if (!eventRef.current[eventType]) {
      eventRef.current[eventType] = (e: Event) => handleEvent(e, eventType);
    }
    return eventRef.current[eventType];
  }, [handleEvent]);

  const registerEvents = () => {
    const container = containerRef.current;
    if (container) {
      EVENT_TYPE.forEach((type: string) => {
        const nativeEventType = type.replace(/^on/, '').toLocaleLowerCase();
        container.addEventListener(nativeEventType, createEventHandler(type));
      });
    }
  };
  const unRegisterEvents = () => {
    const container = containerRef.current;
    if (container) {
      EVENT_TYPE.forEach((type: string) => {
        const nativeEventType = type.replace(/^on/, '').toLocaleLowerCase();
        container.removeEventListener(nativeEventType, eventRef.current[type]);
      });
    }
  };
  useEffect(() => {
    if (options.editable && jsMindRef.current) {
      jsMindRef.current.enable_edit();
    } else {
      jsMindRef.current?.disable_edit();
    }
  }, [options]);
  useEffect(() => {
    if (isReady) {
      jsMindRef?.current?.show(data);
    }
  }, [data, isReady]);


  useEffect(() => {
    const __options = { ...defaultOptions, ...options };
    jsMindRef.current = new jsMind(__options);
    registerEvents();
    setIsReady(true);
    return () => {
      unRegisterEvents();
    };
  }, []);
  return <div ref={containerRef} id="jsmind_container" style={{ width: '100%', height: '100%' }}></div>;
});

export default memo(ReactJsMind);
