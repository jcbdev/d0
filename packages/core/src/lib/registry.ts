import { baseD0s, coreD0s } from '..';

const setDefault = () => {
  // Need to check the types as sometimes we get a double import
  if (
    !globalThis._d0Configs &&
    !globalThis._d0Configs?.default &&
    typeof baseD0s !== 'undefined' &&
    typeof coreD0s !== 'undefined'
  ) {
    globalThis._d0Configs = {
      default: [baseD0s, coreD0s],
    };
  }
};

export const currentD0s = () => {
  setDefault();
  return globalThis._d0Configs;
};

export const defaultD0s = <T = any>(): T => {
  setDefault();
  return globalThis._d0Configs.default.map(d0 => d0()).reduce((a, b) => ({ ...a, ...b }), {});
};

export const d0s = <T = any>(name: string): T => {
  setDefault();
  if (!globalThis._d0Configs[name]) globalThis._d0Configs[name] = [];
  return globalThis._d0Configs[name].map(d0 => d0()).reduce((a, b) => ({ ...a, ...b }), {});
};

export const registerDefaultD0s = <TD0s>(config: TD0s) => {
  setDefault();
  globalThis._d0Configs.default.push(config);
};

export const customD0s = <TD0s>(name: string, config: TD0s) => {
  setDefault();
  if (!globalThis._d0Configs[name]) globalThis._d0Configs[name] = [];
  globalThis._d0Configs[name] = config;
};

export const registerD0s = <TD0s>(name: string, config: TD0s) => {
  setDefault();
  if (!globalThis._d0Configs[name]) globalThis._d0Configs[name] = [];
  globalThis._d0Configs[name].push(config);
};
