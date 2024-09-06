export const NodeArrayData = {
  meta: {
    name: 'demo',
    author: 'demo',
    version: '0.22',
  },
  format: 'node_array',
  data: [
    { id: 'root', isroot: true, topic: 'react-jsMind' },
    {
      id: 'sub1',
      parentid: 'root',
      topic: 'sub1',
      'background-color': '#0000ff',
    },
    { id: 'sub11', parentid: 'sub1', topic: 'sub11' },
    { id: 'sub12', parentid: 'sub1', topic: 'sub12' },
    { id: 'sub13', parentid: 'sub1', topic: 'sub13' },
    { id: 'sub2', parentid: 'root', topic: 'sub2' },
    { id: 'sub21', parentid: 'sub2', topic: 'sub21' },
    {
      id: 'sub22',
      parentid: 'sub2',
      topic: 'sub22',
      'foreground-color': '#33ff33',
    },
    { id: 'sub3', parentid: 'root', topic: 'sub3' },
  ],
};

export const NodeTreeData = {
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
};

export interface NodeTreeDataType {
  meta: { name?: string; author?: string; version?: string };
  format?: string;
  data: {
    id?: string;
    topic?: string;
    direction?: string;
    expanded?: boolean;
    'background-color'?: string;
    children: Array<{
      id?: string;
      topic?: string;
      direction?: string;
      expanded?: boolean;
      'background-color'?: string;
      children: Array<{ id?: string; topic?: string }>;
      data: { width?: number; type?: string }; // 自定义业务数据
    }>;
  };
}

export interface NodeArrayDataType {
  meta: {
    name: string;
    author: string;
    version: string;
  };
  format: string;
  data: Array<{
    id: string;
    isroot?: boolean; // 这个属性不是所有的节点都有，所以标记为可选
    parentid?: string; // 父节点ID，根节点可能没有这个属性
    topic: string;
    'background-color'?: string; // 背景颜色，不是所有节点都有
    'foreground-color'?: string; // 前景颜色，不是所有节点都有
  }>;
}
