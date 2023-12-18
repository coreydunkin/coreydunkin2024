import { create } from "zustand";

type RouteStore = {
  routeValues: any[];
  setRouteValues: (links: any[]) => void;
};

export const useRouteStore = create<RouteStore>((set) => ({
  routeValues: [],
  setRouteValues: (routes) => set({ routeValues: routes }),
}));
