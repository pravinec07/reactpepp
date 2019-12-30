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
} from 'antd';

const { Option } = Select;
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
        <Row>
          <Col span={5}></Col>
          <Col span={14}>
            <h2 style={{ margin: '10px 0px', textAlign: 'center' }}>
              Complete Writer Details
            </h2>
            <Card
              type="inner"
              title="Writer Details"
              style={{ margin: '20px 0px' }}
            >
              <Form layout="vertical" onSubmit={this.handleSubmit}>
                <Row gutter={24}>
                  <Col span={24}></Col>
                  <Col span={6}>
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
                  <Col span={18}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px', fontWeight: '600' }}
                    >
                      <span style={{ color: 'red' }}>* </span> Description
                    </p>
                    <Form.Item label="">
                      {getFieldDecorator('description', {
                        rules: [
                          {
                            required: true,
                            message: 'Please enter description',
                          },
                        ],
                      })(
                        <TextArea
                          style={{ height: '100px' }}
                          placeholder="Max 200 Words"
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px', fontWeight: '600' }}
                    >
                      <span style={{ color: 'red' }}>* </span> Occupation
                    </p>
                    <Form.Item label="" help="Please add your occupation">
                      {getFieldDecorator('occupation', {
                        rules: [
                          {
                            required: true,
                            message: 'Please enter occupation',
                            whitespace: true,
                          },
                        ],
                      })(<Input />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px', fontWeight: '600' }}
                    >
                      <span style={{ color: 'red' }}>* </span> Weekday
                      Availability
                    </p>
                    <Row>
                      <Col span={8}>
                        <Checkbox value="Mon">Mon</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="Tue">Tue</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="Wed">Wed</Checkbox>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <Checkbox value="Thu">Thu</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="Fri">Fri</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="Sat">Sat</Checkbox>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <Checkbox value="Sun">Sun</Checkbox>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px', fontWeight: '600' }}
                    >
                      <span style={{ color: 'red' }}>* </span> Daily Word Count
                    </p>
                    <Form.Item label="">
                      {getFieldDecorator('wordCount', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input word count',
                          },
                        ],
                      })(<Input />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24} style={{ marginTop: '15px' }}></Col>
                  <Col span={12}>
                    <Row>
                      <Col span={5}>
                        <p
                          className="ant-form-item"
                          style={{ marginBottom: '0px', fontWeight: '600' }}
                        >
                          <span style={{ color: 'red' }}>* </span> Writer
                        </p>
                      </Col>
                      <Col span={19}>
                        <Radio.Group onChange={null}>
                          <Radio value={1}>Full Time</Radio>
                          <Radio value={2}>Part Time</Radio>
                        </Radio.Group>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <Col span={7}>
                        <p
                          className="ant-form-item"
                          style={{ marginBottom: '0px', fontWeight: '600' }}
                        >
                          <span style={{ color: 'red' }}>* </span>Freelancer
                        </p>
                      </Col>
                      <Col span={17}>
                        <Radio.Group onChange={null}>
                          <Radio value={1}>Full Time</Radio>
                          <Radio value={2}>Part Time</Radio>
                        </Radio.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24} style={{ marginTop: '15px' }}></Col>
                  <Col span={24}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px', fontWeight: '600' }}
                    >
                      <span style={{ color: 'red' }}>* </span>Preferred Payment
                      Options:
                    </p>
                  </Col>
                  <Col span={24}>
                    <Row>
                      <Col span={6}>
                        <Checkbox>Cheque</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox>Paytm</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox>Google Pay</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox>Account transfer</Checkbox>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Card>
            <Card
              type="inner"
              title="Bank Detail"
              style={{ margin: '20px 0px' }}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    <span style={{ color: 'red' }}>* </span>A/c Number
                  </p>
                  <Form.Item label="">
                    {getFieldDecorator('accNumber', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter A/c number',
                        },
                      ],
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    <span style={{ color: 'red' }}>* </span>A/c Name
                  </p>
                  <Form.Item label="">
                    {getFieldDecorator('accName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter A/c Name',
                        },
                      ],
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    <span style={{ color: 'red' }}>* </span>Bank Name
                  </p>
                  <Form.Item label="">
                    {getFieldDecorator('bankName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter bank name.',
                        },
                      ],
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    <span style={{ color: 'red' }}>* </span>Branch Name
                  </p>
                  <Form.Item label="">
                    {getFieldDecorator('branchName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter branch name',
                        },
                      ],
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    <span style={{ color: 'red' }}>* </span>IFSC Code
                  </p>
                  <Form.Item label="">
                    {getFieldDecorator('ifscCode', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter IFSC code',
                        },
                      ],
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col span={12}></Col>
              </Row>
            </Card>
            <Row>
              <Col
                span={24}
                style={{ textAlign: 'center', marginBottom: '10px' }}
              >
                <Form.Item>
                  <Button type="danger" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={5}></Col>
        </Row>{' '}
      </>
    );
  }
}

const WrappedProfileForm = Form.create({ name: 'profile' })(ProfileForm);

export default WrappedProfileForm;
