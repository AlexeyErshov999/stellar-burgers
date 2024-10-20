import { TUser } from "@utils-types";

export interface UserState {
    isLoadong: boolean;
    user: TUser | null;
    isAuthorized: boolean;
    error: string | null;
  }
