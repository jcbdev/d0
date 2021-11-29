export default (obj: Record<string, any>, prop: string): string => {
  const keys = Object.keys(obj);
  let match = keys.find(k => k == prop);
  if (match) return match;
  const wildcardKeys = keys.filter(k => k.includes('*'));
  match = wildcardKeys.find(k => prop.includes(k.replace('*', '')));
  return match;
};
