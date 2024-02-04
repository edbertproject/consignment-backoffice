import { State } from "@hookstate/core/dist";

export const $clone = (value: any) => {
  if (!value) {
    return [];
  }

  return JSON.parse(JSON.stringify(value));
};

export const $cloneState = (value: State<any>) => {
  return $clone(value.value);
};
