import React, { useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import { NodeArrayData, NodeTreeData } from "./mock";
import ReactJsMind from "@frank17008/react-jsmind";
import type { JsMindData, JsMindRefValue } from "@frank17008/react-jsmind"
import "@frank17008/react-jsmind/dist/esm/index.min.css";
import "./index.less";

const App = () => {
  const mindRef = useRef<JsMindRefValue | null>(null);
  const [data, setData] = useState<JsMindData>(NodeTreeData);
  const [editable, setEditable] = useState(true);
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
    console.log("点击的节点", node);
  };
  const onExpand = (node) => {
    console.log(`节点${node.expanded ? "展开" : "收起"}`, node);
  };
  return (
    <div style={{ width: "100%", height: 400 }}>
      <div className="btns">
        <button onClick={getData}>获取数据</button>
        <button onClick={changeData}>更换数据</button>
        <button onClick={enableEdit}>{editable ? "关闭" : "开启"}编辑</button>
      </div>
      <ReactJsMind
        ref={mindRef}
        options={{ editable }}
        data={data}
        onClick={onNodeClick}
        onExpand={onExpand}
      />
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
