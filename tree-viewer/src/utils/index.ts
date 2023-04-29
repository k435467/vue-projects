import { computed, reactive } from "vue";
import type { Pair } from "../types";
import { v4 as uuid } from "uuid";

export const initInputs: Pair[] = [
  {
    id: uuid(),
    key: "nav.header.creator",
    value: "3D Fabric Creator",
  },
  {
    id: uuid(),
    key: "nav.icon",
    value: "icon name",
  },
  {
    id: uuid(),
    key: "nav.header.product",
    value: "Product",
  },
  {
    id: uuid(),
    key: "common.feature.experience",
    value: "Try It Now!",
  },
  {
    id: uuid(),
    key: "common.feature.chooseFabric",
    value: "Choose Fabric",
  },
];

export const parsePairsToObj = (pairs: Pair[]) => {
  const o: any = {};

  for (const pair of pairs) {
    if (pair.key === "" || pair.value === "" || pair.key.endsWith("."))
      continue;
    const keys = pair.key.split(".");

    // create keys

    let ref = o;
    let refParent = null;
    for (const key of keys) {
      if (typeof ref[key] === "undefined") ref[key] = {};
      refParent = ref;
      ref = ref[key];
    }

    // fill the value

    const lastKey = keys.at(-1);
    if (typeof lastKey !== "undefined") {
      refParent[lastKey] = pair.value;
    }
  }

  return o as Object;
};

export const usePairs = () => {
  const pairs: Pair[] = reactive(initInputs);

  const parsedObj = computed(() => parsePairsToObj(pairs));

  const addPair = () => {
    pairs.push({
      id: uuid(),
      key: "",
      value: "",
    });
  };

  const removePair = (id: string) => {
    const idx = pairs.findIndex((v) => v.id === id);
    if (idx >= 0) pairs.splice(idx, 1);
  };

  return {
    pairs,
    parsedObj,
    addPair,
    removePair,
  };
};
