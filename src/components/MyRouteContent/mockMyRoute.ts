// import { MockData } from '@/src/lib/types';

export interface MockMyRouteItem {
  cardId: number;
  thumbnail: string;
  likes: number;
  title: string;
  description: string;
  tag: string[];
  place: string;
  latlng: { lat: number; lng: number };
}

export interface MockMyRouteData {
  data: MockMyRouteItem[];
}

export const mockMyRoute: MockMyRouteData = {
  data: [
    {
      cardId: 1,
      thumbnail: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
      likes: 112,
      title: '[백종원] 백선생과 예산시장한번 가보시는건 어때요?',
      description:
        '백종원이 예산시장에 떴다~! [님아 그시장을 가오 158화]에서 소개된 충남 예산시장에서 먹부림도 부리고~ 주변에서 들를만한 코스를 추가해서 나만의 여행 코스를 만들어보세요!',
      tag: ['🛤️충남', '🧺시장', '먹방🌭'],
      place: '예산시장',
      latlng: { lat: 36.67723813, lng: 126.8495587 },
    },
    {
      cardId: 2,
      thumbnail: 'https://i.ytimg.com/vi/zrLdC7aYy64/maxresdefault.jpg',
      likes: 110,
      title: '[풍자] 풍자와 함께 광주 먹부림 고고~',
      description:
        '풍자가 광주에 떴다~! [또간집 19화]에서 소개된 광주에서 먹부림도 부리고~ 주변에서 들를만한 코스를 추가해서 나만의 여행 코스를 만들어보세요!',
      tag: ['🛤️광주', '먹방🌭'],
      place: '광주',
      latlng: { lat: 35.1653428, lng: 126.9092003 },
    },
    {
      cardId: 3,
      thumbnail: 'https://i.ytimg.com/vi/lF866XB7uaQ/maxresdefault.jpg',
      likes: 105,
      title: '[곽튜브] 서울 데이트 코스 추천해드릴게요!',
      description:
        '소중한 연인과 함께 곽튜브 [찐따남의 가슴 따뜻한 서울 여행기]에피소드에서 소개된 데이트코스 소개해드릴게요!',
      tag: ['🛤️서울', '데이트👩‍❤️‍👨'],
      place: '서울',
      latlng: { lat: 37.5666791, lng: 126.9782914 },
    },
    {
      cardId: 4,
      thumbnail: 'https://i.ytimg.com/vi/U8EijSQGoQ4/mqdefault.jpg',
      likes: 98,
      title: '[라임튜브] 더운 여름엔 강원도 해수욕장으로~~',
      description: '무더운 여름엔 강원도로 여행을 떠나보시는건 어때요??',
      tag: ['🛤️강원', '가족👪', '바다🌊'],
      place: '경포해수욕장',
      latlng: { lat: 37.8054863, lng: 128.9078306 },
    },
    {
      cardId: 5,
      thumbnail: 'https://i.ytimg.com/vi/SAS0o6ndQ5w/maxresdefault.jpg',
      likes: 80,
      title: '[여행능력자들] 떠오르는 신흥핫플 경남 김해로 여행을 떠나요~~ ',
      description: '소중한 연인과 함께 요즘 떠오르고 있는 핫플레이스 경남 김해에서 멋진 추억을 쌓아보세요!',
      tag: ['🛤️경남', '가족👪'],
      place: '김해',
      latlng: { lat: 35.2285653, lng: 128.889362 },
    },
  ],
};

import { CourseData } from '@/src/utils/zustand/useCourseStore';

export interface mockMyCourseData {
  courseName: string;
  courseId: number;
  coursePlan: {
    day: number;
    places: {
      id: number;
      name: string;
      mainImg: string;
      position: { lat: number; lng: number };
    }[];
  }[];
}

export const mockMyCourse: CourseData = {
  course: [
    {
      id: 1,
      name: 'My Course',
      plan: [
        {
          day: 1,
          place: [
            {
              index: 1,
              name: '상주 경천섬',
              img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMTlfNDkg%2FMDAxNzAwMzUzMDAwODU0.qZXyFsUAP1LdDevbe554FBmc_zoZQ3DpTuyRQEA5No0g.FpTLOCcGgZj-0EY7I6Rw1VGyCHkGLdUK03dsSLSJR5sg.JPEG.zzjworld%2F20231118%25A3%25DF152136.jpg%23900x675',
              posX: 36.44708919803324,
              posY: 128.25738736414664,
            },
            {
              index: 2,
              name: '대구 서문시장',
              img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzExMjlfMjc5%2FMDAxNTExOTM0Mjc5MTg4.r3xrpbihNF9IEpgeuFwXqru8KHSqwH84SBlH8uktmDEg.wiW7ZvP7Y2KluqV050ojktnCYbZ4P5IEi7YesqlWLtEg.JPEG.zipoer%2F1%2529DSC06383.JPG%231600x1067',
              posX: 35.86957266231153,
              posY: 128.58221925092312,
            },
          ],
        },
        {
          day: 2,
          place: [
            {
              index: 3,
              name: '부산 상해 거리',
              img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20121231_299%2Fgamrae007_13569485388977VEM4_JPEG%2Fsam_8666.jpg&type=sc960_832',
              posX: 35.1136875,
              posY: 129.0379375,
            },
            {
              index: 4,
              name: '경기 아토믹워터파크',
              img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODA2MjFfMjU5%2FMDAxNTI5NTMzMTg2MzA1.sPKX4S0yt4chIoSYPfsaogMeCxBl-5c3e68mMKBgAJwg.ivWFogTfB3fgNmrA3K8icsXjTjmOQjK8q11y1_3Gxtwg.JPEG.hong19782001%2F1529321936851.jpg&type=sc960_832',
              posX: 37.791082,
              posY: 127.51864,
            },
          ],
        },
      ],
    },
  ],
};
