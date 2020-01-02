import React from 'react';
import {
  Form,
  Input,
  Upload,
  Icon,
  Row,
  Col,
  Card,
  Checkbox,
  Button,
  Modal,
  message,
  Radio,
  Select,
  Collapse,
} from 'antd';
const { Panel } = Collapse;
const { Option } = Select;
const ButtonGroup = Button.Group;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
class ProfileForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'http://localhost:3054/static/media/user1.56a1f25e.png',
      },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };
  uploadButton = () => (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  render() {
    const { getFieldDecorator } = this.props.form;
    const { TextArea } = Input;
    const { previewVisible, previewImage, fileList } = this.state;

    return (
      <>
        <Form
          layout="vertical"
          onSubmit={this.handleSubmit}
          style={{ padding: '0px 20px 20px 20px' }}
        >
          <h2 style={{ margin: '10px 0px' }}>Writer Details</h2>
          <Row gutter={12}>
            <Col span={11}>
              <Card
                type="inner"
                title="Profile Details"
                extra={
                  <a href="./profileUserEdit">
                    <Icon type="edit" />
                  </a>
                }
              >
                <Row>
                  <Col span={7}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px', fontWeight: '600' }}
                    >
                      Upload Photo
                    </p>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}
                    >
                      {fileList.length >= 1 ? null : this.uploadButton()}
                    </Upload>
                    <Modal
                      visible={previewVisible}
                      footer={null}
                      onCancel={this.handleCancel}
                    >
                      <img
                        alt="example"
                        style={{ width: '100%' }}
                        src={previewImage}
                      />
                    </Modal>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="First Name">
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        Rahul
                      </p>
                    </Form.Item>
                    <Form.Item label="Phone">
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        +91-8586047534
                      </p>
                    </Form.Item>
                  </Col>
                  <Col span={9}>
                    <Form.Item label="Last Name">
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        Sharma
                      </p>
                    </Form.Item>
                    <Form.Item label="Email">
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        rhlsharma8@gmail.com
                      </p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}></Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="Occupation">
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        Content Writer
                      </p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Daily Word Count">
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        15000 WPD
                      </p>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    {' '}
                    <p style={{ color: '#000000a6', marginBottom: '10px' }}>
                      Weekday Availability
                    </p>
                  </Col>
                  <Col span={6}>
                    <Checkbox
                      value="Wed"
                      checked
                      style={{ color: '#16224F', fontWeight: '600' }}
                    >
                      Wed
                    </Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox
                      value="Fri"
                      checked
                      style={{ color: '#16224F', fontWeight: '600' }}
                    >
                      Fri
                    </Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox
                      value="Sat"
                      checked
                      style={{ color: '#16224F', fontWeight: '600' }}
                    >
                      Sat
                    </Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox
                      value="Sun"
                      checked
                      style={{ color: '#16224F', fontWeight: '600' }}
                    >
                      Sun
                    </Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ marginTop: '15px' }}></Col>
                  <Col span={5}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px' }}
                    >
                      Writer
                    </p>
                  </Col>
                  <Col span={7}>
                    <Radio.Group
                      onChange={null}
                      style={{ color: '#16224F', fontWeight: '600' }}
                    >
                      <Radio value={1} checked>
                        Full Time
                      </Radio>
                    </Radio.Group>
                  </Col>
                  <Col span={5}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px' }}
                    >
                      Freelancer
                    </p>
                  </Col>
                  <Col span={7}>
                    <Radio.Group
                      onChange={null}
                      style={{ color: '#16224F', fontWeight: '600' }}
                    >
                      <Radio value={1} checked>
                        Part Time
                      </Radio>
                    </Radio.Group>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    {' '}
                    <p style={{ color: '#000000a6', marginBottom: '0px' }}>
                      Preferred Payment Options
                    </p>
                  </Col>
                  <Col span={7}>
                    <Checkbox
                      value="Wed"
                      checked
                      style={{ color: '#16224F', fontWeight: '600' }}
                    >
                      Cheque
                    </Checkbox>
                  </Col>
                  <Col span={7}>
                    <Checkbox
                      value="Fri"
                      checked
                      style={{ color: '#16224F', fontWeight: '600' }}
                    >
                      Paytm
                    </Checkbox>
                  </Col>
                  <Col span={7}>
                    <Checkbox
                      value="Sat"
                      checked
                      style={{ color: '#16224F', fontWeight: '600' }}
                    >
                      GooglePay
                    </Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ marginTop: '10px' }}></Col>
                  <Col span={12}>
                    <Form.Item label="A/c Number">
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        00910100020876
                      </p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="A/c Holder Name">
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        Rahul Sharma
                      </p>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="Bank & Branch">
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        ICICI Bank Sadar Bazar Delhi
                      </p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="IFSC Code">
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        ICIC0SADARB
                      </p>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={11}>
              <Card
                type="inner"
                title="Basic Information"
                extra={
                  <a href="./profileUserEdit">
                    <Icon type="edit" />
                  </a>
                }
              >
                <Row>
                  <Col span={12}>
                    <Form.Item label="Most Prefered Genre">
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        Lifestyle & Music
                      </p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Second Most Prefered Genre">
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        Politics & News
                      </p>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="Most Prefered Vertical">
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        Technology
                      </p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Second Most Prefered Vertical">
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        Human Resourse
                      </p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <p style={{ color: '#000000d9' }}> Uploaded CV</p>
                  </Col>
                  <Col span={18}>
                    <hr />
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      Abdul_resume.docx -{' '}
                      <span
                        style={{
                          color: '#adadad',
                          fontSize: '12px',
                          fontWeight: '400',
                        }}
                      >
                        {' '}
                        Uploaded on May 20, 2019
                      </span>
                    </p>
                  </Col>
                  <Col span={6}>
                    <hr />
                    <ButtonGroup>
                      <Button>
                        <Icon type="download" />
                      </Button>
                      <Button>
                        <Icon type="delete" />
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <p style={{ color: '#000000d9', marginBottom: '10px' }}>
                      Languages you are proficient in
                    </p>
                  </Col>
                  <Col span={12}>
                    <Checkbox checked>English</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox checked>Hindi</Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Checkbox checked>Punjabi</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox checked>Urdu</Checkbox>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <p style={{ color: '#000000d9', marginTop: '10px' }}>
                      {' '}
                      Uploaded Samples
                    </p>
                  </Col>
                  <Col span={18}>
                    <hr />
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      File1.docx -{' '}
                      <span
                        style={{
                          color: '#adadad',
                          fontSize: '12px',
                          fontWeight: '400',
                        }}
                      >
                        {' '}
                        Uploaded on May 20, 2019
                      </span>
                    </p>
                  </Col>
                  <Col span={6}>
                    <hr />
                    <ButtonGroup>
                      <Button>
                        <Icon type="download" />
                      </Button>
                      <Button>
                        <Icon type="delete" />
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ marginTop: '3px' }}></Col>
                  <Col span={18}>
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      File2.docx -{' '}
                      <span
                        style={{
                          color: '#adadad',
                          fontSize: '12px',
                          fontWeight: '400',
                        }}
                      >
                        {' '}
                        Uploaded on May 20, 2019
                      </span>
                    </p>
                  </Col>
                  <Col span={6}>
                    <ButtonGroup>
                      <Button>
                        <Icon type="download" />
                      </Button>
                      <Button>
                        <Icon type="delete" />
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ marginTop: '3px' }}></Col>
                  <Col span={18}>
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      File3.docx -{' '}
                      <span
                        style={{
                          color: '#adadad',
                          fontSize: '12px',
                          fontWeight: '400',
                        }}
                      >
                        {' '}
                        Uploaded on May 20, 2019
                      </span>
                    </p>
                  </Col>
                  <Col span={6}>
                    <ButtonGroup>
                      <Button>
                        <Icon type="download" />
                      </Button>
                      <Button>
                        <Icon type="delete" />
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Expected Pay? (In Rupees per word)">
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        0.3-0.5 Paise per word
                      </p>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          {/*  */}
          <Row>
            <Col span={24} style={{ marginTop: '20px' }}></Col>
          </Row>
          <Row gutter={12}>
            <Col span={10}>
              <Card
                type="inner"
                title="Experience"
                extra={
                  <a href="./profileUserEdit">
                    <Icon type="edit" />
                  </a>
                }
              >
                <Form.Item label="Previous writing experiences and skillsets.">
                  <p style={{ color: '#16224F', fontWeight: '600' }}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it{' '}
                    <a href="">Read more..</a>
                  </p>
                </Form.Item>
                <Form.Item label=" companies that you've worked for in the past">
                  <p style={{ color: '#16224F', fontWeight: '600' }}>
                    ABA Infotech Pvt. Ltd.{' '}
                    <span
                      style={{
                        color: '#adadad',
                        fontSize: '12px',
                        fontWeight: '400',
                      }}
                    >
                      (Delhi)
                    </span>
                  </p>
                  <p style={{ color: '#16224F', fontWeight: '600' }}>
                    Tata Consultancy Service{' '}
                    <span
                      style={{
                        color: '#adadad',
                        fontSize: '12px',
                        fontWeight: '400',
                      }}
                    >
                      (Gurgaon)
                    </span>
                  </p>
                </Form.Item>
                <Form.Item label="Profession you are in, apart from freelance writing">
                  <p style={{ color: '#16224F', fontWeight: '600' }}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's{' '}
                    <a href="">Read more..</a>
                  </p>
                </Form.Item>
              </Card>
            </Col>
            <Col span={10}></Col>
          </Row>
        </Form>{' '}
      </>
    );
  }
}

const WrappedProfileForm = Form.create({ name: 'profile' })(ProfileForm);

export default WrappedProfileForm;
