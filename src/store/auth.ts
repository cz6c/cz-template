import { defineStore } from "pinia";

interface userInfo {
  id: number;
  name: string;
}

const getUserInfo = () => {
  return new Promise<userInfo>(resolve => {
    setTimeout(() => {
      const data = {
        id: 6,
        name: "cz6",
      };
      resolve(data);
    }, 2000);
  });
};

export const authStore = defineStore("auth", {
  state: () => ({ name: "", id: 0 }),
  getters: {
    newName(state) {
      return `${state.name}-${state.name}`;
    },
  },
  actions: {
    getUserInfo() {
      return new Promise<userInfo>(async resolve => {
        const data = await getUserInfo();
        const { name, id } = data;
        this.$patch({ name, id });
        resolve(data);
      });
    },
  },
});
