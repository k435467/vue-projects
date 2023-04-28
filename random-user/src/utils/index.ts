import { useFavoriteStore } from "@/store/favorite";
import { useUserStore } from "@/store/user";
import { computed, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";

// -- results

export const initResults = 30;
export const resultOpts = [10, 30, 50];

export const useResults = (init: number = 30) => {
  const router = useRouter();
  const route = useRoute();

  const results = computed({
    get: () => parseInt(route.query.results as string) || init,
    set: (v: number) => {
      const query = { ...route.query, results: v, page: 1 };
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

// -- display mode

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

// -- pagination

export const usePage = (init = 1) => {
  const router = useRouter();
  const route = useRoute();

  const page = computed({
    get: () => parseInt(route.query.page as string) || init,
    set: (v: number) => {
      const query = { ...route.query, page: v };
      router.replace({ path: route.path, query });
    },
  });

  return page;
};

export const useUserPagination = (init = 1) => {
  const userStore = useUserStore();
  const { results } = useResults();

  const curPage = usePage(init);
  const tPages = computed(() => {
    const totalUsers = 3010;
    return Math.ceil(totalUsers / results.value);
  });

  const fetch = (page: number, results: number) => {
    if (Number.isInteger(page) && Number.isInteger(results)) {
      return userStore.fetch(page, results);
    }
    return Promise.reject();
  };

  return { curPage, tPages, fetch };
};

export const useFavoritePagination = (init: number = 1) => {
  const curPage = usePage(init);

  const favoriteStore = useFavoriteStore();
  const { results } = useResults();

  const tPages = computed(() =>
    Math.ceil(favoriteStore.ids.length / results.value)
  );

  return { curPage, tPages };
};

/**
 * for pagination
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

// --
