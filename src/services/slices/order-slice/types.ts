import { TOrder } from "@utils-types";

export interface OrderState {
    order: TOrder | null;
    isOrderLoading: boolean;
    error: string | null;
  }
