import { Place, Plan } from '../lib/types';

const consolidatePlans = (plan: Plan[]): Place[] => {
  const combinedPlaces: Place[] = [];
  plan.forEach((day) => {
    combinedPlaces.push(...day.place);
  });
  return combinedPlaces;
};

export default consolidatePlans;
