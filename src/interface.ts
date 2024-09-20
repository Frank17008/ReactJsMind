import React from 'react'
export type JsMindDataType = TreeNode | ArrayTreeNode | string | undefined

export interface JsMindProps {
  data?: JsMindData
  options?: Omit<JsMindOptions, 'container'>
  onClick?: (node: JsMindDataType) => void
  ondblClick?: (node: JsMindDataType) => void
  onMouseOver?: (node: JsMindDataType) => void
  onMouseOut?: (node: JsMindDataType) => void
  onMouseLeave?: (node: JsMindDataType) => void
  onKeyDown?: (node: JsMindDataType) => void
  onKeyUp?: (node: JsMindDataType) => void
  onContextMenu?: (node: JsMindDataType) => void
}

export interface JsMindOptions {
  container: string
  /**
   * 是否可编辑 支持拖拽、缩放等
   * @default true
   */
  editable?: boolean
  /**
   * 主题
   * 支持primary warning danger success info greensea nephrite belizehole wisteria asphalt orange pumpkin pomegranate clouds asbestos
   * @default primary
   */
  theme?: string
  /**
   * 显示模式 full 根节点两侧 / side 根节点右侧
   * @default full
   */
  mode?: 'full' | 'side'
  /**
   * 是否支持节点里的HTML元素
   * @default true
   */
  support_html?: boolean
  view?: {
    /**
     * 渲染模式 canvas | svg
     * @default canvas
     */
    engine?: 'canvas' | 'svg'
    /**
     * 导图距容器外框的最小水平距离
     * @default 100
     */
    hmargin?: number
    /**
     * 导图距容器外框的最小垂直距离
     * @default 50
     */
    vmargin?: number
    /**
     * 线条样式 直线(straight)、曲线(curved)
     * @default curved
     */
    line_style?: 'straight' | 'curved'
    /**
     * 线条宽度
     * @default 2
     */
    line_width?: number
    /**
     * 线条颜色
     * @default #555
     */
    line_color?: React.CSSProperties['color']
  }
  /**
   * 布局配置
   */
  layout?: {
    /**
     * 节点之间的水平间距（像素）相当于margin的水平方向
     * @default 30
     */
    hspace?: number
    /**
     *节点之间的垂直间距（像素）相当于margin的垂直方向
     * @default 20
     */
    vspace?: number
    /**
     * 节点收缩/展开控制器的尺寸（像素）
     * * @default 13
     */
    pspace?: number
  }
  /**
   * 快捷键配置
   */
  shortcut?: {
    /**
     * 是否启用快捷键
     * @default true
     */
    enable?: boolean
    /**
     * 其他快捷键事件集合
     */
    handles?: Record<string, any>
    mapping?: {
      /**
       * 添加子节点
       * @default 45 即【Insert】按键
       */
      addchild?: number
      /**
       * 添加兄弟节点
       * @default 13 即【Enter】按键
       */
      addbrother?: number
      /**
       * 编辑节点
       * @default 113 即【F2】按键
       */
      editnode?: number
      /**
       * 删除节点
       * @default 46 即【Delete】按键
       */
      delnode?: number
      /**
       * 展开/收缩节点
       * @default 32 即【Space】按键
       */
      toggle?: number
      left?: number
      up?: number
      right?: number
      down?: number
    }
  }
}
// jsmind实例
export interface JsMindInstance {
  // screenshot: {
  //   shoot: () => void;
  //   download: () => void;
  // };
  screenshot: any
  shoot: () => void
  show: (data: JsMindData | undefined) => void
  enable_edit: () => void
  disable_edit: () => void
  get_node: (nodeId: string) => JsMindDataType
  get_data: (format?: 'node_tree' | 'node_array' | 'freemind') => JsMindDataType
  set_node_font_style: (
    nodeid: string,
    size: React.CSSProperties['fontSize'],
    weight: React.CSSProperties['fontWeight'],
    style: React.CSSProperties['fontStyle']
  ) => void
  set_node_color: (node_id: string, bg_color: React.CSSProperties['color'], fg_color: React.CSSProperties['color']) => void
  add_node: (
    parent_node: Omit<JsMindDataType, 'undefined'>,
    node_id: string,
    topic: string,
    data: Omit<JsMindDataType, 'undefined'>,
    direction: string
  ) => JsMindDataType | null
  get_selected_node: () => JsMindDataType | null
  expand_all: () => void
  remove_node: (node: Omit<JsMindDataType, 'undefined'>) => boolean
  update_node: (node_id: string | number, topic: string) => void
  scroll_node_to_center: (node) => void
}
// 定义ref的接口
export interface JsMindRefValue {
  getInstance: () => JsMindInstance | null
  screenShot: () => void
  getData: () => JsMindDataType
  setNodeFontStyle: (
    nodeid: string,
    size: React.CSSProperties['fontSize'],
    weight: React.CSSProperties['fontWeight'],
    style: React.CSSProperties['fontStyle']
  ) => void
  setNodeColor: (node_id: string, bg_color: React.CSSProperties['color'], fg_color: React.CSSProperties['color']) => void
  addNode: (
    parent_node: Omit<JsMindDataType, 'undefined'>,
    node_id: string,
    topic: string,
    data: Omit<JsMindDataType, 'undefined'>,
    direction: string
  ) => JsMindDataType | null
  getSelectedNode: () => JsMindDataType | null
  expandAll: () => void
  removeNode: (node: Omit<JsMindDataType, 'undefined'>) => boolean
}

export interface JsMindData {
  meta: {
    name?: string
    author?: string
    version?: string
  }
  format?: 'node_tree' | 'node_array' | 'freemind'
  /* 数据内容 */
  data: JsMindDataType
}

export interface TreeNode {
  /**
   * 节点唯一标识,不能重复
   */
  id: string
  /**
   * 节点上显示的内容
   */
  topic: string
  /**
   * 节点的方向，此数据仅在第一层节点上有效，目前仅支持 left 和 right 两种，默认为 right
   * @default right
   */
  direction?: 'left' | 'right'
  /**
   * 该节点是否是展开状态，默认为 true
   * @default true
   */
  expanded?: boolean
  /**
   * 子节点集合
   */
  children?: TreeNode[]
  /**
   * 其他数据, 如业务数据
   */
  data?: any
  /**
   * 节点背景色
   */
  'background-color'?: React.CSSProperties
}

export interface ArrayTreeNode extends Omit<TreeNode, 'children'> {
  parentid?: string
  isroot?: boolean
}
