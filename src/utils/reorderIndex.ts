import { Plan } from '../lib/types';

const reorderIndex = (plan: Plan[]) => {
  // Reassign index values in ascending order
  let globalIndex = 1;
  for (let j = 0; j < plan.length; j++) {
    for (let i = 0; i < plan[j].place.length; i++) {
      plan[j].place[i].index = globalIndex++;
    }
  }
  return plan;
};

export default reorderIndex;
