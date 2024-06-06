import instance from '../axios';

const checkDuplicate = async (endpoint: string, body: Record<string, any>) => {
  try {
    const response = await instance.post(endpoint, body);
    return response.status !== 409;
  } catch (error: any) {
    console.error(error);
    if (error.response?.status === 409) {
      console.error(error);
    }
    return false;
  }
};

export default checkDuplicate;
