export type NodeSelector = {
  array: (node: any, info?: NodeInfo) => string;
  object: (node: any, info?: NodeInfo) => string;
  primitive: (node: any, info?: NodeInfo) => string;
};

export type NodeInfo = {
  parent?: any;
  name?: string;
  index?: number;
  path?: ReadonlyArray<string | number>;
  ancestors?: ReadonlyArray<any | any[]>;
};
