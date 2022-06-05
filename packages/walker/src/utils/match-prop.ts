export default (obj: Record<string, any>, prop: string): string => {
  const keys = Object.keys(obj);
  let match = keys
    .filter(k => !k.startsWith('regex:'))
    .find(k =>
      k
        .split(',')
        .map(ks => ks.trim())
        .find(ks => ks == prop)
    );
  // console.log(match);
  // if (match && match != '*') console.log(match);
  if (match) return match;
  const regexKeys = [].concat(...keys.filter(k => k.startsWith('regex:')).map(k => k.replace('regex:', '')));
  match = regexKeys.find(k => prop.match(k));
  // match = keys.find(k => k.includes(match));
  // if (match && match != '*') console.log(match);
  if (!match) return undefined;
  return `regex:${match}`;
};
