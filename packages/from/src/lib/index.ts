import { fromJson, FromJson as _FromJson } from './from-json';
import { fromText, FromText as _FromText } from './from-text';
import { fromYaml, FromYaml as _FromYaml } from './from-yaml';
import { mergeJson, MergeJson as _MergeJson } from './merge-json';
import { mergeYaml, MergeYaml as _MergeYaml } from './merge-yaml';

export default {
  fromJson,
  fromText,
  fromYaml,
  mergeJson,
  mergeYaml,
} as FromTransforms;

export namespace From {
  export type FromJson = _FromJson;
}

export type FromTransforms = {
  fromJson: From.FromJson;
};
