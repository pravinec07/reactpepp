let createdAt = new Date().getTime();
const tableData = [];
const RawData = {
  id: '939d07e3-1e00-46fc-aefb-db8938031efa',
  articleName: 'pepper article1',
  articleDesc: 'pepper article description1',
  createdDate: 1576400578533,
  projectId: 'cd3e150f-8b3d-4cb5-92d5-ff8b598505db',
  deadLineDate: 1577005378534,
  articleCode: 'ART-01',
  articleTopic: 'blog',
  word: '2000',
  keyword: 'java, api, aws, react',
  genre: 'Banking',
  vertical: 'Bank',
  refrence: 'news',
  RemainingTime: '2d, 22hr, 14min',
  deadline: '12/11/19',
  transactionDate: '',
  transactionId: '',
  transactionAmount: '',
  transactionStatus: '',
  transactiondocumentUrl: '',
  remarks: '',
  feedback: '',
  revisions: [
    {
      documentUrl: 'www.facebook.com',
      revisionCreatedDate: 1576400578534,
      modifiedDate: 1576400578534,
      updatedBy: '3dd43ac0-0e44-4b09-ac70-28162cf7e533',
    },
    {
      documentUrl: 'www.facebook.com',
      revisionCreatedDate: 1576400578534,
      modifiedDate: 1576400578534,
      updatedBy: '3dd43ac0-0e44-4b09-ac70-28162cf7e533',
    },
  ],
};
const sortOption = {};
for (let i = 0; i < 101; i++) {
  tableData.push({ ...RawData, srNo: `${i + 1}`, articleCode: `ART-${i}` });
}

class fakeData {
  constructor(size) {
    this.size = size || 2000;
    this.datas = [];
    this.sortKey = null;
    this.sortDir = null;
  }
  dataModel(index) {
    return tableData[index];
  }
  getObjectAt(index) {
    if (index < 0 || index > this.size) {
      return undefined;
    }
    if (this.datas[index] === undefined) {
      this.datas[index] = this.dataModel(index);
    }
    return this.datas[index];
  }
  getAll() {
    if (this.datas.length < this.size) {
      for (let i = 0; i < this.size; i++) {
        this.getObjectAt(i);
      }
    }
    return this.datas.slice();
  }

  getSize() {
    return this.size;
  }
  getSortAsc(sortKey) {
    sortOption.sortKey = sortKey;
    sortOption.sortDir = 'ASC';
    return this.datas.sort(this.sort);
  }
  getSortDesc(sortKey) {
    sortOption.sortKey = sortKey;
    sortOption.sortDir = 'DESC';
    return this.datas.sort(this.sort);
  }
  sort(optionA, optionB) {
    const valueA = optionA[sortOption.sortKey].toUpperCase();
    const valueB = optionB[sortOption.sortKey].toUpperCase();
    let sortVal = 0;
    if (valueA > valueB) {
      sortVal = 1;
    }
    if (valueA < valueB) {
      sortVal = -1;
    }
    if (sortVal !== 0 && sortOption.sortDir === 'DESC') {
      return sortVal * -1;
    }
    return sortVal;
  }
}
export default fakeData;
