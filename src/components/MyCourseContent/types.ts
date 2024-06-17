// types.ts
// export type Position = {
//   posX: number;
//   posY: number;
// };

export type PlaceData = {
  index: number;
  name: string;
  img: string;
  posX: number;
  posY: number;
};

export type CourseData = {
  name: string;
  places: PlaceData[];
};
