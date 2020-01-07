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

export class ProfileModel {
  constructor(data = {}, initModel = true) {
    if (initModel) {
      this.init(data);
    }
  }

  init(data) {
    this.username = data.email || '';
    this.email = data.email || '';
    this.companyName = data.companyName || 'Inherit';
    this.name = data.firstName || '';
    this.lastname = data.lastNmae || '';
    this.phoneNumber = data.phoneNumber || '';
    this.identifyType = data.identifyType || '';
    this.industryType = data.industryType || '';
    this.cvUrl = data.cvUrl || '';
    this.volumeOfContent = data.volumeOfContent || '';
    this.monthlyBudget = data.monthlyBudget || '';
    this.onlinePresence = data.onlinePresence || '';
    this.requirements = data.requirements || '';
    this.marketingType = data.marketingType || [];
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
    this.accessToken = data.accessToken || '';
    this.userCreateDate = data.userCreateDate || '';
    this.userStatus = data.userStatus || '';
    this.lastModifiedDate = data.lastModifiedDate || '';
    this.agreementFlag = data.agreementFlag || '';
    this.picture = data.picture || '';
    this.freelancer = data.freelancer || '';
    this.dailyWordCount = data.dailyWordCount || '';
    this.availability = data.availability || [];
    this.occupation = data.occupation || '';
    this.description = data.description || '';
    this.pancard = data.pancard || '';
    this.ifscCode = data.ifscCode || '';
    this.branchName = data.branchName || '';
    this.accountHolder = data.accountHolder || '';
    this.accountNumber = data.accountNumber || '';
    this.clientForm = data.clientForm || true;
    this.zohoForm = data.zohoForm || false;
    this.writerForm = data.writerForm || true;
    this.bankName = data.bankName || '';
    this.writer = data.writer || '';
  }
}
