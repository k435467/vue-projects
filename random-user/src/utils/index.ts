import { ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";

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
