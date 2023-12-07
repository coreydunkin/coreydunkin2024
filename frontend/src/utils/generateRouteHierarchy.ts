export const generateRouteHierarchy = (
  links: { id: number; name: string; href: string }[],
): Record<string, number> => {
  const routeHierarchy: Record<string, number> = {};
  links.forEach((link) => {
    routeHierarchy[link.href] = link.id;
  });
  return routeHierarchy;
};
