import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";
import axios from "axios";
import qs from "query-string";
import { normalizeUser } from "@/utils/user";

export interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    country: string;
    city: string;
  };
  email: string;
  login: {
    uuid: string;
    username: string;
  };
  dob: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

interface Meta {
  seed: string;
  results: number;
  page: number;
}

interface UserApiResponse {
  results: User[];
  info: Meta;
}

const seed = "12j0sk";

export const useUserStore = defineStore("user", () => {
  const ids = ref<string[]>([]);
  const users = shallowRef<{ [key: string]: User } | undefined>();
  const meta = ref<Meta | null>(null);
  const loading = ref<boolean>(false);

  const fetch = async (page: number = 1, results: number = 30) => {
    try {
      loading.value = true;
      const url = qs.stringifyUrl({
        url: "https://randomuser.me/api",
        query: { seed, page, results },
      });
      const { data } = await axios.get<UserApiResponse>(url);
      const normalizedData = normalizeUser(data.results);
      ids.value = normalizedData.ids;
      users.value = normalizedData.users;
      meta.value = data.info;
    } catch (e) {
      console.error(e);
    } finally {
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
