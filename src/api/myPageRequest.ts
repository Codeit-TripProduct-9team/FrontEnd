import instance from './axios';

class myPageRequest {
  async getCourseList(userId: number) {
    return (await instance.get(`/user/${userId}/course`)).data.data;
  }
  async deleteCourseList(userId: number, courseId: number) {
    return await instance.delete(`/user/${userId}/course/${courseId}`);
  }
  async getCourseData(userId: number) {
    return (await instance.get(`/user/${userId}/video`)).data.data;
  }
}

const myCoursePageRequestInstance = new myPageRequest();

export default myCoursePageRequestInstance;
