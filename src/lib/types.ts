export interface MockDataItem {
  cardId: number;
  thumbnail: string;
  likes: number;
  title: string;
  description: string;
  tag: string[];
}

export interface MockData {
  data: MockDataItem[];
}