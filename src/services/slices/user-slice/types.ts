import { TUser, TOrder } from "@utils-types";

export interface UserState {
    isAuthenticated: boolean;
    loginUserRequest: boolean;
    user: TUser | null;
    orders: TOrder[];
    ordersRequest: boolean;
    error: string | null;
  }
