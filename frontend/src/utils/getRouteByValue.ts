// This wil be used to increment/decrement the page route on mouse scroll and swipe
import { routesHierarchy } from "@/components/LayoutTransition/utils";

export const getRouteByValue = (value: number): string | undefined => {
  return Object.keys(routesHierarchy).find(
    (key) => routesHierarchy[key] === value,
  );
};
