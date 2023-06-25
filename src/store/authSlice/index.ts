const initialState: State = {
  user: null,
  isAuthorized: false,
};

export const createAuthSlice = (set) => ({
  ...initialState,
  setUser: (user) => set(() => ({ user })),
  resetAuth: () => {
    set(initialState);
  },
});
