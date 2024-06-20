import { CourseData } from '@/src/utils/zustand/useCourseStore/useCourseStore';

export const mockMyCourse: CourseData = {
  name: 'My Course',
  plan: [
    {
      day: 1,
      place: [
        {
          index: 1,
          name: '상주 경천섬',
          description: 'description',
          img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMTlfNDkg%2FMDAxNzAwMzUzMDAwODU0.qZXyFsUAP1LdDevbe554FBmc_zoZQ3DpTuyRQEA5No0g.FpTLOCcGgZj-0EY7I6Rw1VGyCHkGLdUK03dsSLSJR5sg.JPEG.zzjworld%2F20231118%25A3%25DF152136.jpg%23900x675',
          posX: 36.44708919803324,
          posY: 128.25738736414664,
        },
        {
          index: 2,
          name: '대구 서문시장',
          description: 'description',
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
          description: 'description',
          img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20121231_299%2Fgamrae007_13569485388977VEM4_JPEG%2Fsam_8666.jpg&type=sc960_832',
          posX: 35.1136875,
          posY: 129.0379375,
        },
        {
          index: 4,
          name: '경기 아토믹워터파크',
          description: 'description',
          img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODA2MjFfMjU5%2FMDAxNTI5NTMzMTg2MzA1.sPKX4S0yt4chIoSYPfsaogMeCxBl-5c3e68mMKBgAJwg.ivWFogTfB3fgNmrA3K8icsXjTjmOQjK8q11y1_3Gxtwg.JPEG.hong19782001%2F1529321936851.jpg&type=sc960_832',
          posX: 37.791082,
          posY: 127.51864,
        },
      ],
    },
  ],
};
