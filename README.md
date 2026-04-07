# ReactJsMind

<p align="center">
  <img src="https://img.shields.io/badge/ReactJSMind-JsMind?style=flat&logo=webcomponentsdotorg&color=%23333" alt="reactjsmind" />
  <img src="https://img.shields.io/badge/node-v16.20.0-brightgreen?style=flat&logo=nodedotjs&color=rgb(0%2C126%2C198)" alt="node" />
  <img src="https://img.shields.io/badge/packed%20size-27.9%20KB-brightgreen?style=flat&color=rgb(0%2C126%2C198)" alt="size" />
  <img src="https://img.shields.io/badge/webpack-v5.93-brightgreen?style=plastic&logo=webpack" alt="webpack" />
  <img src="https://img.shields.io/badge/jsMind-0.8.5%2B-brightgreen?style=plastic&logo=npm" alt="jsMind" />
</p>

> React 版本的 jsMind 组件库，让开发者能够以声明式组件方式使用思维导图

## 特性

- 🎯 **TypeScript 支持** - 完整的类型定义
- 🎨 **灵活配置** - 支持 jsMind 所有配置选项
- 🔌 **Ref 暴露** - 通过 ref 调用实例方法
- 🖼️ **截图导出** - 支持导出 PNG 图片（无水印）

## 安装

```bash
npm install @frank17008/react-jsmind

# 或使用 yarn
yarn add @frank17008/react-jsmind
```

## 快速开始

```tsx
import React, { useRef, useState } from 'react'
import ReactJsMind from '@frank17008/react-jsmind'
import type { JSMindRefValue, JsMindData } from '@frank17008/react-jsmind'

const App = () => {
  const mindRef = useRef<JSMindRefValue | null>(null)
  const [editable, setEditable] = useState(true)

  // 获取思维导图数据
  const getData = () => {
    if (mindRef.current) {
      const data = mindRef.current.getData()
      console.log(data)
    }
  }

  // 节点数据
  const mindData: JsMindData = {
    meta: { name: '思维导图', author: 'Your Name', version: '0.8.5' },
    format: 'node_tree',
    data: {
      id: 'root',
      topic: '😊根节点',
      children: [
        {
          id: '1',
          topic: '子节点1',
          direction: 'left',
          expanded: true,
          'background-color': '#03BF8A',
          children: [
            { id: '2', topic: '子节点2' },
            { id: '3', topic: '子节点3' },
          ],
          data: { width: 100, type: 'rect' }, // 自定义业务数据
        },
      ],
    },
  }

  return (
    <div style={{ width: '100%', height: 800 }}>
      <div className="btns">
        <button onClick={getData}>获取数据</button>
        <button onClick={() => setEditable(!editable)}>
          {editable ? '关闭' : '开启'}编辑
        </button>
      </div>
      <ReactJsMind
        ref={mindRef}
        options={{ editable }}
        data={mindData}
        onClick={(node) => console.log('点击节点:', node)}
      />
    </div>
  )
}

export default App
```

## API

### Props

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `data` | `TreeNode \| ArrayTreeNode` | 是 | 思维导图数据，支持树结构和数组结构 |
| `options` | `JsMindOptions` | 否 | jsMind 配置选项 |
| `className` | `string` | 否 | 自定义 CSS 类名 |
| `style` | `React.CSSProperties` | 否 | 内联样式 |
| `onClick` | `(node: JsMindNode) => void` | 否 | 节点点击事件 |
| `onMouseOver` | `(node: JsMindNode) => void` | 否 | 节点鼠标悬停事件 |
| `onMouseOut` | `(node: JsMindNode) => void` | 否 | 节点鼠标离开事件 |
| `onMouseLeave` | `(node: JsMindNode) => void` | 否 | 节点鼠标离开容器事件 |
| `onContextMenu` | `(node: JsMindNode) => void` | 否 | 节点右键事件 |
| `onKeyUp` | `(node: JsMindNode) => void` | 否 | 节点键盘事件 |
| `onDblClick` | `(node: JsMindNode) => void` | 否 | 节点双击事件 |
| `onExpand` | `(node: JsMindNode) => void` | 否 | 节点展开事件 |

> 完整的 `options` 配置请参考 [jsMind 配置文档](https://github.com/hizzgdev/jsmind/blob/master/docs/zh/2.options.md)

### Ref 方法

通过 `mindRef.current` 调用以下方法：

| 方法 | 参数 | 说明 |
|------|------|------|
| `getData()` | - | 获取当前思维导图数据 |
| `getSelectedNode()` | - | 获取当前选中的节点 |
| `expandAll()` | - | 展开所有节点 |
| `addNode(parentNode, nodeId, topic, data, direction)` | 父节点, 节点ID, 标题, 数据, 方向 | 添加新节点 |
| `removeNode(node)` | 节点对象 | 删除节点 |
| `setNodeColor(nodeId, bgColor, fgColor)` | 节点ID, 背景色, 前景色 | 设置节点颜色 |
| `setNodeFontStyle(nodeId, size, weight, style)` | 节点ID, 字号, 字重, 字体风格 | 设置节点字体样式 |
| `screenShot()` | - | 导出为 PNG 图片（无水印） |
| `getInstance()` | - | 获取 jsMind 原生实例 |

> 更多实例方法请参考 [jsMind 节点操作文档](https://github.com/hizzgdev/jsmind/blob/master/docs/zh/3.operation.md)

### 数据格式

组件支持两种数据格式：

**树结构 (node_tree)**
```ts
{
  meta: { name: '...', author: '...', version: '...' },
  format: 'node_tree',
  data: {
    id: 'root',
    topic: '根节点',
    children: [
      { id: '1', topic: '子节点1', children: [...] },
    ]
  }
}
```

**数组结构 (node_array)**
```ts
{
  meta: { ... },
  format: 'node_array',
  data: [
    { id: 'root', topic: '根节点', parent: null },
    { id: '1', topic: '子节点1', parent: 'root' },
  ]
}
```

## 注意事项

1. **容器尺寸** - 组件会自动创建 `jsmind_container` 容器并充满父容器，请确保父容器已定义宽高

2. **获取原生实例** - 如需使用 jsMind 未暴露的方法，可通过 `mindRef.current.getInstance()` 获取原生实例

## 相关链接

- [ReactJsMind在线Demo](frank17008.github.io/ReactJsMind)
- [jsMind 文档](https://github.com/hizzgdev/jsmind)
- [jsMind 数据格式](https://github.com/hizzgdev/jsmind/blob/master/docs/zh/1.usage.md)
- [jsMind 配置选项](https://github.com/hizzgdev/jsmind/blob/master/docs/zh/2.options.md)
- [jsMind 节点操作](https://github.com/hizzgdev/jsmind/blob/master/docs/zh/3.operation.md)

## License

MIT