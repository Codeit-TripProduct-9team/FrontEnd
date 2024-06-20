export interface MockDataItem {
  id: number;
  thumbnail: string;
  likes: number;
  title: string;
  description: string;
  content: string;
  tag: [];
  videoUrl: string;
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
  title: string | undefined;
  description: string | undefined;
  thumbnail: string | undefined;
}

export interface ReviewDataItem {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  score: number;
}

export interface VideoInformationProps {
  id?: number;
  title?: string;
  content?: string;
  url?: string;
  tag?: string;
  likeCount?: number;
}

export interface videoListProps {
  id: number;
  tag: string;
  title: string;
  url: string;
}

//my course list 데이터
export interface Place {
  index: number;
  name: string;
  img: string;
  posX: number;
  posY: number;
}

export interface Plan {
  day: number;
  place: Place[];
}

export interface Course {
  id: number;
  name: string;
  plan: Plan[];
}

export interface CourseData {
  course: Course[];
}

export interface MyCourseApiResponse {
  status: string;
  message: string;
  data: CourseData;
}
