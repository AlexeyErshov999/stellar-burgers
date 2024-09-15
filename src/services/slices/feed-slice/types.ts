import { TOrder } from "@utils-types";

export interface FeedState {
    orders: TOrder[];
    isFeedsLoading: boolean;
    order: TOrder | null;
    isOrderLoading: boolean;
    total: number;
    totalToday: number;
    error: string | null;
  }
