import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { NodeArrayData, NodeTreeData, NodeArrayDataType, NodeTreeDataType } from './mock';
// import ReactJsMind from '../dist/index'
import ReactJsMind from 'react-jsmind';
import 'react-jsmind/dist/index.min.css';
import './index.less';

const App = () => {
  const mindRef = useRef<ReactJsMind | null>(null);
  const [data, setData] = useState<NodeTreeDataType | NodeArrayDataType>(NodeTreeData);
  const [editable, setEditable] = useState<Boolean>(true);
  const getData = () => {
    if (mindRef.current) {
      const data = mindRef.current.getData();
      alert(JSON.stringify(data));
    }
  };
  const changeData = () => {
    setData(NodeArrayData);
  };
  const enableEdit = () => {
    setEditable(!editable);
  };
  const onNodeClick = (node) => {
    console.log('点击的节点', node);
  };
  return (
    <div style={{ width: '100%', height: 400 }}>
      <div className='btns'>
        <button onClick={getData}>获取数据</button>
        <button onClick={changeData}>更换数据</button>
        <button onClick={enableEdit}>{editable ? '关闭' : '开启'}编辑</button>
      </div>
      <ReactJsMind ref={mindRef} options={{ editable }} data={data} onClick={onNodeClick} />
    </div>
  );
};

const RenderApp = <>{App()}</>;

ReactDOM.render(RenderApp, document.getElementById('root'));
