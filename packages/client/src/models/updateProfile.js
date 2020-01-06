export class ChangePasswordModel {
  constructor(data = {}, initModel = true) {
    if (initModel) {
      this.init(data);
    }
  }
  init(data) {
    this.username = data.username || '';
    this.password = data.password || '';
    this.oldPassword = data.oldPassword || '';
    this.accessToken = data.accessToken || '';
    this.confirmationCode = data.confirmationCode || '';
  }
}
