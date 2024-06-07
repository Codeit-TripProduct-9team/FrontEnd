export interface MockDataItem {
  cardId: number;
  thumbnail: string;
  likes: number;
  title: string;
  description: string;
  tag: string[];
  url: string;
}

export interface MockData {
  data: MockDataItem[];
}

export interface relatedListItem {
  place: string[];
  youtuber: string[];
  tag: string[];
}

export interface InputForm {
  text?: string;
  email: string;
  password: string;
  newpassword?: string;
  passwordcheck: string;
  nickname: string;
  checkbox?: boolean;
  file?: string;
  verify?: string;
}

export interface kakaoShareProps {
  title: string;
  description: string;
  thumbnail: string;
}
