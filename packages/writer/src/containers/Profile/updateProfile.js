import React, { Fragment } from 'react';
import {
  Form,
  Input,
  Upload,
  Icon,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Modal,
  message,
  Radio,
} from 'antd';
import { placeholder } from '@babel/types';
import LaguageField from './LanguageField';
const { Dragger } = Upload;
const { Option } = Select;
const options = [
  { label: 'Can read', value: 1 },
  { label: 'Basic writing', value: 2 },
  { label: 'Experienced writing', value: 3 },
];

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

    return (
      <Fragment>
        <Form
          layout="vertical"
          onSubmit={this.handleSubmit}
          style={{ padding: '50px 100px' }}
        >
          <Row gutter={24}>
            <Col span={24}>
              <h2>Basic information and experience</h2>
            </Col>
            <Col span={24}>
              <LaguageField />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}></Col>
            <Col span={12}>
              <Form.Item label="Most perferred genre">
                {getFieldDecorator('Vertical', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter vertical',
                    },
                  ],
                })(<Select />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Dragger
                {...{
                  name: 'file',
                  multiple: true,
                  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
                  onChange(info) {
                    const { status } = info.file;
                    if (status !== 'uploading') {
                      console.log(info.file, info.fileList);
                    }
                    if (status === 'done') {
                      message.success(
                        `${info.file.name} file uploaded successfully.`
                      );
                    } else if (status === 'error') {
                      message.error(`${info.file.name} file upload failed.`);
                    }
                  },
                }}
              >
                <p>
                  <Icon type="cloud-upload" />
                  <span>Drag & drop (or) choose file</span>
                </p>
                <p className="ant-upload-text"></p>
                <p className="ant-upload-hint"></p>
              </Dragger>
            </Col>
            <Col span={24}>
              <Form.Item label="Write a Sample">
                {getFieldDecorator('writeSample', {
                  rules: [],
                })(<TextArea />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}></Col>
            <Col span={12}>
              <Form.Item label="Other genre">
                {getFieldDecorator('Vertical', {
                  rules: [],
                })(<Select />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Dragger
                {...{
                  name: 'file',
                  multiple: true,
                  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
                  onChange(info) {
                    const { status } = info.file;
                    if (status !== 'uploading') {
                      console.log(info.file, info.fileList);
                    }
                    if (status === 'done') {
                      message.success(
                        `${info.file.name} file uploaded successfully.`
                      );
                    } else if (status === 'error') {
                      message.error(`${info.file.name} file upload failed.`);
                    }
                  },
                }}
              >
                <p>
                  <Icon type="cloud-upload" />
                  <span>Drag & drop (or) choose file</span>
                </p>
                <p className="ant-upload-text"></p>
                <p className="ant-upload-hint"></p>
              </Dragger>
            </Col>
            <Col span={24}>
              <Form.Item label="Write a Sample">
                {getFieldDecorator('writeSample', {
                  rules: [],
                })(<TextArea />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}></Col>
            <Col span={12}>
              <Form.Item label="Prefered Vertical">
                {getFieldDecorator('Vertical', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter vertical',
                    },
                  ],
                })(<Select />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Other Vertical">
                {getFieldDecorator('otherVertical', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter other vertical',
                    },
                  ],
                })(<Select />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Can you write generic content.">
                {getFieldDecorator('genericContent', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter bank name.',
                    },
                  ],
                })(<Select />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Experience in years">
                {getFieldDecorator('experienceyears', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter experience in years',
                    },
                  ],
                })(<Input placeholder="Experience in years" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Descrobe your experience in 150 words.">
                {getFieldDecorator('experienceDetails', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter experience details',
                    },
                  ],
                })(<TextArea />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}></Col>
            <Col span={10}>
              <p className="ant-form-item">Where did you hear about Pepper?</p>
            </Col>
            <Col span={14}>
              <Form.Item label="">
                {getFieldDecorator(`language`, {
                  initialValue: ``,
                  rules: [{ required: true, message: `Please select...` }],
                })(
                  <Select layout="inline" onChange={this.handleChange}>
                    <Option value="">Please select...</Option>
                    <Option value="US">News papper</Option>
                    <Option value="CA">Television</Option>
                    <Option value="web">Website</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{ float: 'right' }}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Fragment>
    );
  }
}

const WrappedProfileForm = Form.create({ name: 'profile' })(ProfileForm);

export default WrappedProfileForm;
