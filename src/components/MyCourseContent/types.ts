// types.ts
export type Position = {
  lat: number;
  lng: number;
};

export type PlaceData = {
  id: number;
  name: string;
  mainImg: string;
  position: Position;
};

export type CourseData = {
  name: string;
  places: PlaceData[];
};
