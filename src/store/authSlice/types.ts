export type TStateAuth = {
  user: string;
  isAuthorized: boolean;
};

export type TActionsAuth = {
  setUser: (qty: number) => void;
  resetAuth: () => void;
};
