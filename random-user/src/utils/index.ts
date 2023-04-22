import { normalize, schema } from "normalizr";
import { User } from "@/store/user";

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
