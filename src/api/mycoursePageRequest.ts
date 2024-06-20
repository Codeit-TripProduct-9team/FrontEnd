import instance from './axios';

class myCoursePageRequest {
  async getCourseList(userId: number) {
    return (await instance.get(`/user/${userId}/course`)).data.data;
  }
  async deleteCourseList(userId: number, courseId: number) {
    return await instance.delete(`/user/${userId}/course/${courseId}`);
  }
}

const myCoursePageRequestInstance = new myCoursePageRequest();

export default myCoursePageRequestInstance;
