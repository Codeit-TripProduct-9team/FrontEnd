import instance from './axios';

const combineVideoPlace = async (userId?: number) => {
  try {
    const url = userId ? `/user/${userId}/video` : '/video';
    const videoData = await instance.get(`${url}`);
    const modifiedVideoData = videoData.data.data.map((item) => ({
      content: item.content,
      id: item.id,
      videoUrl: item.videoUrl,
      tags: item.tags,
      title: item.title,
    }));

    // Promise.all to fetch each course data then map them to combine with video data
    const videoId = videoData.data.data.map((item) => item.id);
    return Promise.all(videoId.map((id) => instance.get(`/course/${id}`))).then((responses) => {
      // responses is an array of responses for each request
      const combinedData = responses.map((response, index) => {
        const courseData = response.data.data.course[0];
        return {
          content: modifiedVideoData[index].content,
          id: modifiedVideoData[index].id,
          videoUrl: modifiedVideoData[index].videoUrl,
          tags: modifiedVideoData[index].tags,
          title: modifiedVideoData[index].title,
          name: courseData.name,
          img: courseData.img.replace(/'/g, ''),
          description: courseData.description,
          posX: courseData.posX,
          posY: courseData.posY,
        };
      });
      return combinedData;
    });
  } catch (error) {
    console.error('Error fetching card list:', error);
  }
};

export default combineVideoPlace;
