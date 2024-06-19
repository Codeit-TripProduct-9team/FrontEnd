import { CourseData } from '@/src/lib/types';

const items: CourseData = {
  course: [
    {
      id: 1,
      name: 'Item 1',
      plan: [
        {
          day: 1,
          place: [
            {
              index: 1,
              name: 'Place 1111111111111',
              img: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
              posX: 37.7749,
              posY: -122.4194,
            },
            {
              index: 2,
              name: 'Place 2',
              img: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
              posX: 34.0522,
              posY: -118.2437,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Item 2',
      plan: [
        {
          day: 1,
          place: [
            {
              index: 1,
              name: 'Place 3',
              posX: 40.7128,
              posY: -74.006,
              img: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
            },
            {
              index: 2,
              name: 'Place 4',
              posX: 48.8566,
              posY: 2.3522,
              img: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'Item 3',
      plan: [
        {
          day: 1,
          place: [
            {
              index: 1,
              name: 'Place 5',
              img: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
              posX: 35.6895,
              posY: 139.6917,
            },
            {
              index: 2,
              name: 'Place 6',
              img: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
              posX: 51.5074,
              posY: -0.1278,
            },
          ],
        },
        {
          day: 2,
          place: [
            {
              index: 3,
              name: 'Place 7',
              img: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
              posX: 51.5074,
              posY: -0.1278,
            },
            {
              index: 4,
              name: 'Place 8',
              img: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
              posX: 51.5074,
              posY: -0.1278,
            },
            {
              index: 5,
              name: 'Place 9',
              img: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
              posX: 51.5074,
              posY: -0.1278,
            },
          ],
        },
      ],
    },
  ],
};

export default items;
