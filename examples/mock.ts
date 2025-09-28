export const NodeArrayData = {
  meta: {
    name: "demo",
    author: "demo",
    version: "0.22",
  },
  format: "node_array",
  data: [
    { id: "root", isroot: true, topic: "react-jsMind" },
    {
      id: "sub1",
      parentid: "root",
      topic: "sub1",
      "background-color": "#0000ff",
    },
    { id: "sub11", parentid: "sub1", topic: "sub11" },
    { id: "sub12", parentid: "sub1", topic: "sub12" },
    { id: "sub13", parentid: "sub1", topic: "sub13" },
    { id: "sub2", parentid: "root", topic: "sub2" },
    { id: "sub21", parentid: "sub2", topic: "sub21" },
    {
      id: "sub22",
      parentid: "sub2",
      topic: "sub22",
      "foreground-color": "#33ff33",
    },
    { id: "sub3", parentid: "root", topic: "sub3" },
  ],
};

export const NodeTreeData = {
  meta: { name: "mind图", author: "Your Name", version: "0.8.5" },
  format: "node_tree",
  data: {
    id: "root",
    topic: "😊根节点",
    children: [
      {
        id: "1",
        topic: "子节点1",
        direction: "left",
        expanded: true,
        "background-color": "#03BF8A",
        children: [
          { id: "2", topic: "子节点2" },
          { id: "3", topic: "子节点3" },
        ],
        data: { width: 100, type: "rect" }, // 自定义业务数据
      },
    ],
  },
};
