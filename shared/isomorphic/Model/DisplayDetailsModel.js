export default class PageDetail {
  constructor(data) {
    this.data = data;
    this.modifiedData = {};
  }

  getData() {
    const rowData = [];
    // this.data.map(item => {
    //   rowData.push({ ...item });
    // });
    // localStorage.getItem('currentArticle')
    this.data &&
      Object.keys(this.data).map(item => {
        switch (item) {
          case 'articleCode': {
            rowData.push({
              label: 'Article Code',
              value: this.data[item],
              class: 'value',
              type: 'plainLabel',
            });
            break;
          }
          case 'RemainingTime': {
            rowData.push({
              label: 'Time ',
              value: this.data[item],
              class: 'value',
              type: 'plainLabel',
            });
            break;
          }
          case 'articleName': {
            rowData.push({
              label: 'Topic',
              value: this.data[item],
              class: 'value',
              type: 'plainLabel',
            });
            break;
          }
          case 'word': {
            rowData.push({
              label: 'Words',
              value: this.data[item],
              class: 'value',
              type: 'plainLabel',
            });
            break;
          }
          case 'deadLineDate': {
            rowData.push({
              label: 'Deadline',
              value: this.data[item],
              class: 'value',
              type: 'plainLabel',
            });
            break;
          }
          case 'genre': {
            rowData.push({
              label: 'Genre',
              value: this.data[item],
              class: 'value',
              type: 'plainLabel',
            });
            break;
          }
          case 'vertical': {
            rowData.push({
              label: 'Vertical',
              value: this.data[item],
              class: 'value',
              type: 'plainLabel',
              colLength: 24,
            });
            break;
          }
          case 'genre': {
            rowData.push({
              label: 'File Attached',
              value: this.data[item],
              class: 'value',
              type: 'plainLabel',
              href: revisions[0].documentUrl,
            });
            break;
          }
        }
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
    console.log('modified data', this.modifiedData, rowData, this.data);
    return this.modifiedData;
  }
}
