import { Place, Plan } from '../lib/types';

const consolidatePlans = (plan: Plan[]): Place[] => {
  const combinedPlaces: Place[] = [];
  let idCounter = 1;

  plan.forEach((day) => {
    day.place.forEach((place) => {
      combinedPlaces.push({ ...place, id: idCounter });
      idCounter++;
    });
  });

  return combinedPlaces;
};

export default consolidatePlans;
