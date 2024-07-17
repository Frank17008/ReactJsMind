import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { NodeArrayData, NodeTreeData } from './mock'
// import ReactJsMind from '../dist/index'
import ReactJsMind from 'react-jsmind'
import 'react-jsmind/dist/index.min.css'
import './index.less'

const App = () => {
  const mindRef: any = useState(null)
  const [data, setData] = useState(NodeTreeData)
  const [editable, setEditable] = useState(true)
  const getData = () => {
    if (mindRef.current) {
      const data = mindRef.current.getData()
      alert(JSON.stringify(data))
    }
  }
  const changeData = () => {
    setData(NodeArrayData)
  }
  const enableEdit = () => {
    setEditable(!editable)
  }
  const onNodeClick = (node) => {
    console.log('点击的节点', node)
  }
  return (
    <div style={{ width: '100%', height: 800 }}>
      <div className='btns'>
        <button onClick={getData}>获取数据</button>
        <button onClick={changeData}>设置数据</button>
        <button onClick={enableEdit}>{editable ? '关闭' : '开启'}编辑</button>
      </div>
      <ReactJsMind ref={mindRef} options={{ editable }} data={data} onClick={onNodeClick} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
