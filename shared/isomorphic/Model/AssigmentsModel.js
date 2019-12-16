export default class AssignmentDetail {
  constructor(data) {
    this.data = data;
    this.modifiedData = {};
  }

  getData() {
    const rowData = [];
    this.data.map(item => {
      rowData.push({ ...item });
    });
    const modifiedData = {
      pageHeader: {
        title: 'Article Details',
        handlePrinter: () => {},
        handlePdf: () => {},
        handleShare: () => {},
      },
      articleDetails: rowData,
    };
    this.modifiedData = modifiedData;
    return this.modifiedData;
  }
}
