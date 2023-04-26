import { useUserStore } from "@/store/user";
import { computed, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";

export const initResults = 30;
export const resultOpts = [10, 30, 50];

export const useResults = (init: number = 30) => {
  const router = useRouter();
  const route = useRoute();

  const results = computed({
    get: () => parseInt(route.query.results as string) || init,
    set: (v: number) => {
      const query = { ...route.query, results: v };
      router.replace({ path: route.path, query });
    },
  });

  const onResultSelectChange = (e: Event) => {
    const v = parseInt((e.target as HTMLInputElement).value);
    if (Number.isInteger(v)) {
      results.value = v;
    }
  };

  return { results, onResultSelectChange };
};

type Display = "list" | "grid";

export const useDisplay = (init: Display = "grid") => {
  const router = useRouter();
  const route = useRoute();

  const display = computed({
    get: () => (route.query.display as string) || init,
    set: (v: string) => {
      const query = { ...route.query, display: v };
      router.replace({ path: route.path, query });
    },
  });

  const changeDisplayMode = (v: Display) => {
    if (v !== display.value) {
      display.value = v;
    }
  };

  return { display, changeDisplayMode };
};

export const usePagination = () => {
  const userStore = useUserStore();
  const { results } = useResults();

  const curPage = computed(() => {
    return userStore.meta?.page;
  });
  const tPages = computed(() => {
    const totalUsers = 3010;
    return Math.ceil(totalUsers / results.value);
  });

  const route = useRoute();
  watchEffect(() => {
    // watch the page qs and then fetch users
    const page = parseInt((route.query.page || "1") as string);
    if (Number.isInteger(page)) {
      userStore.fetch(page, results.value);
    }
  });

  return { curPage, tPages };
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
