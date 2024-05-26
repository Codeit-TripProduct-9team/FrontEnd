export interface MockDataItem {
  thumbnail: string;
  likes: number;
  title: string;
  description: string;
  tag: string[];
}

export interface MockData {
  data: MockDataItem[];
}