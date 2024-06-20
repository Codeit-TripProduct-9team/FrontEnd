const extractPath = (result: any) => {
  const path: { lat: number; lng: number }[] = [];
  const pathArray = result.routes[0].sections[0].roads;
  pathArray.forEach((route: any) => {
    route.vertexes.forEach((_, index: number) => {
      const seperateCoordinate = index % 2 === 0;
      if (seperateCoordinate) {
        path.push({
          lat: route.vertexes[index + 1],
          lng: route.vertexes[index],
        });
      }
    });
  });
  return path;
};

export default extractPath;
