export default (obj: any): boolean => {
  let type = typeof obj;
  return type === 'function' || (type === 'object' && !!obj);
};
