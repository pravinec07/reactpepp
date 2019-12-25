export default class Model {
  constructor(data = {}, initModel = true) {
    if (initModel) {
      this.init(data);
    }
  }

  init(data) {
    // this.username = data.username || '';
    this.password = data.password || '';
    this.email = data.email || '';
    this.emailVerified = true;
    this.companyName = data.companyName || 'Inherit';
    this.name = data.firstName || '';
    this.lastname = data.lastNmae || '';
    this.phoneNumber = `${data.prefix}${data.phoneNumber}` || '';
    this.identifyType = data.identifyType || '';
    this.industryType = data.industryType || '';
    this.cvUrl = data.cvUrl || '';
    this.volumeOfContent = data.volumeOfContent || '';
    this.monthlyBudget = data.monthlyBudget || '';
    this.onlinePresence = data.onlinePresence || '';
    this.requirements = data.requirements || '';
    this.marketingType = data.marketingType || '';
    this.contentFor = data.contentFor || '';
    this.genre1 = data.genre1 || '';
    this.genre2 = data.genre2 || '';
    this.vertical1 = data.vertical1 || '';
    this.vertical2 = data.vertical2 || '';
    this.languages = data.languages || [];
    this.contentSampleUrl = data.contentSampleUrl || '';
    this.expectedPay = data.expectedPay || '';
    this.writingSkillSet = data.writingSkillSet || '';
    this.pastCompanies = data.pastCompanies || '';
    this.socialMedia = data.socialMedia || '';
    this.currentProfession = data.currentProfession || '';
  }
}
