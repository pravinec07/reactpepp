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
              Basic Information & Experience
            </h2>
            <Card
              type="inner"
              title="Basic Information"
              style={{ margin: '20px 0px' }}
            >
              <Form layout="vertical" onSubmit={this.handleSubmit}>
                <Row gutter={24}>
                  <Col span={24}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px', fontWeight: '600' }}
                    >
                      Please upload your CV
                    </p>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label=""
                      help="Uploading your CV/Resume adds a lot of credibility to your application and helps us evaluate better. Please upload only PDF files."
                    >
                      {getFieldDecorator('dragger', {
                        valuePropName: 'fileList',
                        // getValueFromEvent: this.normFile,
                      })(
                        <Upload.Dragger name="files" action="/upload.do">
                          <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                          </p>
                          <p className="ant-upload-text">
                            Click or drag file to this area to upload
                          </p>
                          <p className="ant-upload-hint">
                            Support for a single or bulk upload.
                          </p>
                        </Upload.Dragger>
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
                      Select your Most Prefered Genre
                    </p>
                    <Form.Item label="">
                      {getFieldDecorator('gender', {
                        rules: [{ required: true, message: 'Please select!' }],
                      })(
                        <Select
                          placeholder="-Select-"
                          onChange={this.handleSelectChange}
                        >
                          <Option value=""></Option>
                          <Option value=""></Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px', fontWeight: '600' }}
                    >
                      Select your second Most Prefered Genre
                    </p>
                    <Form.Item label="">
                      {getFieldDecorator('gender', {
                        rules: [{ required: true, message: 'Please select!' }],
                      })(
                        <Select
                          placeholder="-Select-"
                          onChange={this.handleSelectChange}
                        >
                          <Option value=""></Option>
                          <Option value=""></Option>
                        </Select>
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
                      Select your Most Preferred Vertical
                    </p>
                    <Form.Item label="">
                      {getFieldDecorator('gender', {
                        rules: [{ required: true, message: 'Please select!' }],
                      })(
                        <Select
                          placeholder="-Select-"
                          onChange={this.handleSelectChange}
                        >
                          <Option value=""></Option>
                          <Option value=""></Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px', fontWeight: '600' }}
                    >
                      Select your Second Most Preferred Vertical
                    </p>
                    <Form.Item label="">
                      {getFieldDecorator('gender', {
                        rules: [{ required: true, message: 'Please select!' }],
                      })(
                        <Select
                          placeholder="-Select-"
                          onChange={this.handleSelectChange}
                        >
                          <Option value=""></Option>
                          <Option value=""></Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px', fontWeight: '600' }}
                    >
                      What languages are you proficient in?
                    </p>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="A">Assamese</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="B">English</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="C">Gujarati</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="D">Hindi</Checkbox>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={6}>
                    <Checkbox value="E">Kannada</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="E">Malayalam</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="D">Mandarin </Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="E">Odia</Checkbox>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={6}>
                    <Checkbox value="E">Punjabi</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="D">Tamil</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="E">Telugu</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="E">Urdu</Checkbox>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={6}>
                    <Checkbox value="E">European Lang.</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="E">
                      Other South-east Asian Languages
                    </Checkbox>
                  </Col>
                  <Col span={8}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24} style={{ marginTop: '15px' }}></Col>
                  <Col span={24}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px', fontWeight: '600' }}
                    >
                      Please upload Samples (Preferably in the categories that
                      you have selected.)
                    </p>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label=""
                      help="The more, the merrier. We will only be able to assign you assignments in verticals and genre that you can prove you have previous experience in. And these samples help us pinpoint these verticals and categories!"
                    >
                      {getFieldDecorator('dragger', {
                        valuePropName: 'fileList',
                        // getValueFromEvent: this.normFile,
                      })(
                        <Upload.Dragger name="files" action="/upload.do">
                          <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                          </p>
                          <p className="ant-upload-text">
                            Click or drag file to this area to upload
                          </p>
                          <p className="ant-upload-hint">
                            Support for a single or bulk upload.
                          </p>
                        </Upload.Dragger>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24} style={{ marginTop: '15px' }}></Col>
                  <Col span={14}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px', fontWeight: '600' }}
                    >
                      Please let us know your Expected Pay? (In Rupees per word)
                    </p>
                    <Form.Item label="">
                      {getFieldDecorator('gender', {
                        rules: [{ required: true, message: 'Please select!' }],
                      })(
                        <Select
                          placeholder="-Select-"
                          onChange={this.handleSelectChange}
                        >
                          <Option value=""></Option>
                          <Option value=""></Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24} style={{ marginTop: '15px' }}></Col>
                  <Col span={24}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px', fontWeight: '600' }}
                    >
                      Please tell us a bit about your previous writing
                      experiences and skillsets.
                    </p>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label=""
                      help="Please tell us more about the types of content projects that you've worked on before."
                    >
                      {getFieldDecorator('audience', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input audience',
                          },
                        ],
                      })(<TextArea style={{ height: '80px' }} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24} style={{ marginTop: '15px' }}></Col>
                  <Col span={24}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px', fontWeight: '600' }}
                    >
                      Please list down the companies that you've worked for in
                      the past.
                    </p>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label=""
                      help="It is not absolutely necessary but helps us decide better. It will also affect the pay scale that we offer you."
                    >
                      {getFieldDecorator('audience', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input audience',
                          },
                        ],
                      })(<TextArea style={{ height: '80px' }} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24} style={{ marginTop: '15px' }}></Col>
                  <Col span={14}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px', fontWeight: '600' }}
                    >
                      How did you hear about this position?
                    </p>
                    <Form.Item label="" help="">
                      {getFieldDecorator('gender', {
                        rules: [{ required: true, message: 'Please select!' }],
                      })(
                        <Select
                          placeholder="-Select-"
                          onChange={this.handleSelectChange}
                        >
                          <Option value=""></Option>
                          <Option value=""></Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24} style={{ marginTop: '15px' }}></Col>
                  <Col span={24}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px', fontWeight: '600' }}
                    >
                      What profession are you in, apart from freelance writing?
                    </p>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="">
                      {getFieldDecorator('audience', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input audience',
                          },
                        ],
                      })(<TextArea style={{ height: '80px' }} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Save for Later
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={12} style={{ textAlign: 'left' }}>
                    <Form.Item>
                      <Button type="danger" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
          <Col span={5}></Col>
        </Row>{' '}
      </>
    );
  }
}

const WrappedProfileForm = Form.create({ name: 'profile' })(ProfileForm);

export default WrappedProfileForm;
