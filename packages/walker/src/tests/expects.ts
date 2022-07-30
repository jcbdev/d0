export const expectSomeObject = () => ({ test: 'string' });
export const expectAnArray = () => [1, 2, 3];
export const expectNotPrimitive = () => expect.any(Date);
export const expectFullObject = () => ({
  someObject: expectSomeObject(),
  anArray: expectAnArray(),
  notprimitive: expectNotPrimitive(),
});

export const expectBaseNodeInfo = (
  name: string,
  path: string[],
  options?: {
    pathAncestors?: any;
    nodeAncestors?: any;
    parent?: any;
  }
) => {
  let info: any = {
    name: name,
    path: path,
    pathAncestors: options?.pathAncestors ?? [],
    nodeAncestors: options?.nodeAncestors ?? [],
  };
  if (options?.parent) info.parent = options.parent;
  return info;
};

export const expectObjectNodeInfo = (
  name: string,
  path: string[],
  options?: {
    pathAncestors?: any;
    nodeAncestors?: any;
    parent?: any;
  }
) => {
  let info: any = {
    name: name,
    path: path,
    pathAncestors: options?.pathAncestors ?? [],
    nodeAncestors: options?.nodeAncestors ?? [],
  };
  if (options?.parent) info.parent = options.parent;
  info.nodeType = 'object';
  info.selector = 'Object';
  return info;
};

export const expectArrayNodeInfo = (
  name: string,
  path: string[],
  options?: {
    pathAncestors?: any;
    nodeAncestors?: any;
    parent?: any;
  }
) => {
  let info: any = {
    name: name,
    path: path,
    pathAncestors: options?.pathAncestors ?? [],
    nodeAncestors: options?.nodeAncestors ?? [],
  };
  if (options?.parent !== null || typeof options?.parent !== 'undefined') info.parent = options.parent;
  info.nodeType = 'array';
  info.selector = 'Array';
  return info;
};

export const expectPrimitiveNodeInfo = (
  name: string,
  path: any[],
  options?: {
    pathAncestors?: any;
    nodeAncestors?: any;
    parent?: any;
    index?: number;
  }
) => {
  let info: any = {
    name: name,
    path: path,
    pathAncestors: options?.pathAncestors ?? [],
    nodeAncestors: options?.nodeAncestors ?? [],
  };
  if (options?.parent) info.parent = options.parent;
  info.nodeType = 'primitive';
  info.selector = 'Primitive';
  if (options?.index !== null || typeof options?.index !== 'undefined') info.index = options.index;
  return info;
};
