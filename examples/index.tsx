import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import ReactJsMind from '../dist/index'
import '../dist/index.min.css'

const App = () => {
  const mindRef = useState(null)
  const mockData = {
    meta: { name: 'mind图', author: 'Your Name', version: '0.8.5' },
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
  const onNodeClick = (node) => {
    console.log('点击的节点', node)
  }
  return (
    <div style={{ width: '100%', height: 800 }}>
      <ReactJsMind ref={mindRef} options={{ editable: true }} data={mockData} onClick={onNodeClick} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
