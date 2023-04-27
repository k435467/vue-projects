import { normalize, schema } from "normalizr";
import type { User } from "@/store/user";
import { InjectionKey } from "vue";

const userEntity = new schema.Entity<User>(
  "users",
  {},
  { idAttribute: (entity: User) => entity.login.uuid }
);
const userSchema = new schema.Array(userEntity);

export const normalizeUser = (users: User[]) => {
  const v = normalize<User>(users, userSchema);
  return {
    ids: v.result as string[],
    users: v.entities.users,
  };
};

// --

export const getName = (user: User | undefined) => {
  if (user) {
    const { title, first, last } = user.name;
    return `${title} ${first} ${last}`;
  }
};

// --

export const userModalKey = Symbol() as InjectionKey<{
  userModal: { id: string; show: boolean };
  openUserModal: (id: string) => void;
}>;
