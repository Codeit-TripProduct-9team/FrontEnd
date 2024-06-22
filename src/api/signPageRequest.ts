import instance from './axios';

class SignPageRequest {
  async changePassword(email: string, newPassword: string, checkPassword: string) {
    return await instance.patch(`/auth/change-password`, {
      email: email,
      newPassword: newPassword,
      checkPassword: checkPassword,
    });
  }

  async overlapEmail(email: string) {
    return await instance.post(`/auth/duplicate/email`, { email: email });
  }
}

const signPageRequestInstance = new SignPageRequest();

export default signPageRequestInstance;
