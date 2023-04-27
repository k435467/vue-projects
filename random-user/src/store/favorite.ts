import { defineStore } from "pinia";
import { reactive } from "vue";
import { User } from "./user";

export const useFavoriteStore = defineStore("favorite", () => {
  const ids: string[] = reactive([]);
  const users = reactive(new Map<string, User>());

  const add = (id: string, user: User) => {
    ids.push(id);
    users.set(id, user);
  };

  const remove = (id: string) => {
    const i = ids.indexOf(id);
    if (i >= 0) ids.splice(i, 1);
    users.delete(id);
  };

  const has = (id: string | undefined) => (id ? users.has(id) : false);

  const toggle = (id: string, user: User) => {
    if (has(id)) remove(id);
    else add(id, user);
  };

  const getById = (id: string) => users.get(id);

  return {
    ids,
    add,
    remove,
    has,
    toggle,
    getById,
  };
});
