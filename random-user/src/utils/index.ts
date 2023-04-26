import { ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";

export const initResults = 30;
export const resultOpts = [10, 30, 50];

export const useResults = (init: number = 30) => {
  const router = useRouter();
  const route = useRoute();
  const results = ref<number>(init);

  watchEffect(() => {
    // watch the results qs and then update the ref
    const q = parseInt(route.query.results as string);
    if (Number.isInteger(q)) {
      results.value = q;
    }
  });

  const onResultSelectChange = (e: Event) => {
    // change the results qs
    const results = parseInt((e.target as HTMLInputElement).value);
    if (Number.isInteger(results)) {
      const query = { ...route.query, results };
      router.replace({ path: route.path, query });
    }
  };

  return { results, onResultSelectChange };
};

type Display = "list" | "grid";

export const useDisplay = (init: Display = "grid") => {
  const router = useRouter();
  const route = useRoute();
  const display = ref<Display>(init);

  watchEffect(() => {
    // watch the display qs and then update the ref
    if (route.query.display === "list" || route.query.display === "grid") {
      display.value = route.query.display;
    }
  });

  const changeDisplayMode = (display: Display) => {
    // change the display qs
    const cur = route.query.display;
    if (cur !== display) {
      const query = { ...route.query, display };
      router.replace({ path: route.path, query });
    }
  };

  return { display, changeDisplayMode };
};

/**
 * @param t total pages
 * @param p the current page
 * @param b buffer size
 */
export const getBtnArr = (t: number, p: number | undefined, b: number = 2) => {
  const a: (number | string)[] = [];
  if (typeof p === "undefined" || p < 1 || t < 1 || b < 1) return a;

  let left = 1;
  let right = t;

  if (t > b * 2 + 1) {
    let overflow = 0;

    if (p - b >= 1) {
      left = p - b;
    } else {
      overflow = 1 + b - p;
    }

    if (p + b + overflow <= t) {
      right = p + b + overflow;
      overflow = 0;
    } else {
      overflow = p + b - t;
    }
    left -= overflow;
  }

  for (let i = left; i <= right; ++i) {
    a.push(i);
  }

  if ((a[0] as number) > 2) a.unshift("...");
  if (a[0] !== 1) a.unshift(1);

  if ((a.at(-1) as number) < t - 1) a.push("...");
  if (a.at(-1) !== t) a.push(t);

  return a;
};
