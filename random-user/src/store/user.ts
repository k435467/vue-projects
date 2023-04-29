import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";
import axios from "axios";
import qs from "query-string";
import { normalizeUser } from "@/utils/user";
import type { User, Meta, UserApiResponse } from "@/types";

const seed = "12j0sk";

export const useUserStore = defineStore("user", () => {
  const ids = ref<string[]>([]);
  const users = shallowRef<{ [key: string]: User } | undefined>();
  const meta = ref<Meta | null>(null);
  const loading = ref<boolean>(false);
  let controller: AbortController | null = null;

  const fetch = async (page: number, results: number) => {
    try {
      if (controller) controller.abort(); // cancel previous fetch

      loading.value = true;
      const url = qs.stringifyUrl({
        url: "https://randomuser.me/api",
        query: { seed, page, results },
      });
      const control = new AbortController();
      controller = control;
      const { data } = await axios.get<UserApiResponse>(url, {
        signal: control.signal,
      });

      const normalizedData = normalizeUser(data.results);
      ids.value = normalizedData.ids;
      users.value = normalizedData.users;
      meta.value = data.info;
    } catch (e) {
      console.error(e);
    } finally {
      controller = null;
      loading.value = false;
    }
  };

  const getById = (id: string | undefined) =>
    id ? users.value?.[id] : undefined;

  return {
    ids,
    users,
    meta,
    loading,
    fetch,
    getById,
  };
});
