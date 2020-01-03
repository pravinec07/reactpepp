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
  Slider,
} from 'antd';
const { Panel } = Collapse;
const { Option } = Select;
const marks = {
  0: {
    label: <strong>Tropical</strong>,
  },
  5: {
    label: <strong>Promotional</strong>,
  },
};
const marks2 = {
  0: {
    label: <strong>Concise</strong>,
  },
  5: {
    label: <strong>Explanatory</strong>,
  },
};
const marks3 = {
  0: {
    label: <strong>Formal</strong>,
  },
  5: {
    label: <strong>Casual</strong>,
  },
};
const marks4 = {
  0: {
    label: <strong>Niche</strong>,
  },
  5: {
    label: <strong>Generic</strong>,
  },
};
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
          <h2 style={{ margin: '10px 0px' }}>Client Details</h2>
          <Row gutter={12}>
            <Col span={10}>
              <Card
                type="inner"
                title="Company Information"
                extra={
                  <a href="./editDetails">
                    <Icon type="edit" />
                  </a>
                }
                style={{ height: '353px' }}
              >
                <Form.Item label="Company Name">
                  <p style={{ color: '#16224F', fontWeight: '600' }}>
                    ABA Infotech Pvt Ltd
                  </p>
                </Form.Item>
                <Form.Item label="Company Email">
                  <p style={{ color: '#16224F', fontWeight: '600' }}>
                    info@abainfotech.com
                  </p>
                </Form.Item>
                <Form.Item label="Company Website">
                  <p style={{ color: '#16224F', fontWeight: '600' }}>
                    www.abainfotech.com
                  </p>
                </Form.Item>
              </Card>
            </Col>
            <Col span={10}>
              <Card
                type="inner"
                title="POC Details"
                extra={
                  <a href="./editDetails">
                    <Icon type="edit" />
                  </a>
                }
              >
                <Form.Item label="">
                  <Row>
                    <Col span={24}>
                      <Checkbox checked>I am the POC</Checkbox>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item label="Name">
                  <p style={{ color: '#16224F', fontWeight: '600' }}>
                    Rahul Sharma
                  </p>
                </Form.Item>
                <Form.Item label="Email">
                  <p style={{ color: '#16224F', fontWeight: '600' }}>
                    rahulsharma888@gmail.com
                  </p>
                </Form.Item>
                <Form.Item label="Phone">
                  <p style={{ color: '#16224F', fontWeight: '600' }}>
                    +91-8586047534
                  </p>
                </Form.Item>
                <Collapse accordion>
                  <Panel header="Add Alternate POC" key="1">
                    <Form.Item label="Alternate POC Name">
                      {getFieldDecorator('companyName', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input your Company Name!',
                          },
                        ],
                      })(<Input placeholder="Enter POC Name" />)}
                    </Form.Item>
                    <Form.Item label="Alternate POC Email">
                      {getFieldDecorator('companyName', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input your Company Name!',
                          },
                        ],
                      })(<Input placeholder="Enter POC Email" />)}
                    </Form.Item>
                    <Form.Item label="Alternate POC Phone">
                      {getFieldDecorator('companyName', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input your Company Name!',
                          },
                        ],
                      })(<Input placeholder="Enter POC Phone" />)}
                    </Form.Item>
                  </Panel>
                </Collapse>
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
                title="Industry & Audience"
                extra={
                  <a href="./editDetails">
                    <Icon type="edit" />
                  </a>
                }
              >
                <Form.Item label="Primary Industry">
                  <p style={{ color: '#16224F', fontWeight: '600' }}>
                    Technology & Software
                  </p>
                </Form.Item>
                <Form.Item label="Secondary Industry">
                  <p style={{ color: '#16224F', fontWeight: '600' }}>
                    Digital Marketing
                  </p>
                </Form.Item>
                <Form.Item label="What are you looking for">
                  <Row>
                    <Col span={12}>
                      <Checkbox checked>Content Writer</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox checked>Graphic Designer</Checkbox>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Checkbox checked>Language Translators</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox>Video Maker</Checkbox>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item label="Preferred Language">
                  <Row>
                    <Col span={12}>
                      <Checkbox checked>English</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox checked>Hindi</Checkbox>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Checkbox checked>French</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox checked>Spanish</Checkbox>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Checkbox checked>Punjabi</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox checked>German</Checkbox>
                    </Col>
                  </Row>
                </Form.Item>
                <Row>
                  <Col span={24}>
                    <p>Tonality</p>
                    <Row gutter={24}>
                      <Col span={24}>
                        <Slider
                          disabled
                          defaultValue={4}
                          min={0}
                          max={5}
                          marks={marks}
                          style={{ width: '80%' }}
                        />
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={24}>
                        <Slider
                          disabled
                          defaultValue={2}
                          min={0}
                          max={5}
                          marks={marks2}
                          style={{ width: '80%' }}
                        />
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={24}>
                        <Slider
                          disabled
                          defaultValue={3}
                          min={0}
                          max={5}
                          marks={marks3}
                          style={{ width: '80%' }}
                        />
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={24}>
                        <Slider
                          disabled
                          defaultValue={4}
                          min={0}
                          max={5}
                          marks={marks4}
                          style={{ width: '80%' }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={10}>
              <Card
                type="inner"
                title="Other Company Details"
                extra={
                  <a href="./editDetails">
                    <Icon type="edit" />
                  </a>
                }
              >
                <Form.Item label="Company Registered Name">
                  <p style={{ color: '#16224F', fontWeight: '600' }}>
                    ABA Infotech
                  </p>
                </Form.Item>
                <Form.Item label="Company Address">
                  <p style={{ color: '#16224F', fontWeight: '600' }}>
                    609 6th Floor Padma Tower 2,
                  </p>
                </Form.Item>
                <Form.Item label="">
                  <p style={{ color: '#16224F', fontWeight: '600' }}>
                    Near Rajender Place Metro Station
                  </p>
                </Form.Item>
                <Form.Item
                  label=""
                  style={{ paddingBottom: '0px', marginBottom: '0px' }}
                >
                  <Row>
                    <Col span={11}>
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        Delhi
                      </p>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        New Delhi
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} style={{ marginTop: '12px' }}></Col>
                    <Col span={11}>
                      <p style={{ color: '#16224F', fontWeight: '600' }}>
                        India
                      </p>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                      <Form.Item label="">
                        <p style={{ color: '#16224F', fontWeight: '600' }}>
                          110008
                        </p>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item label="Company Phone">
                  <p style={{ color: '#16224F', fontWeight: '600' }}>
                    011-47020788
                  </p>
                </Form.Item>
                <Form.Item label="Company GST">
                  <p style={{ color: '#16224F', fontWeight: '600' }}>
                    MHNC89787SJS9
                  </p>
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Form>{' '}
      </>
    );
  }
}

const WrappedProfileForm = Form.create({ name: 'profile' })(ProfileForm);

export default WrappedProfileForm;
