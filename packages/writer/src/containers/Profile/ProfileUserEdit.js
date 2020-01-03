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
          <h2 style={{ margin: '10px 0px' }}>Edit Writer Details</h2>
          <Row gutter={12}>
            <Col span={11}>
              <Card
                type="inner"
                title="Basic Information"
                extra={
                  <a href="./my-profile">
                    <Icon type="close" />
                  </a>
                }
              >
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="Most Prefered Genre">
                      {getFieldDecorator('gender', {
                        rules: [{ required: true, message: 'Please select!' }],
                      })(
                        <Select
                          placeholder="-Select-"
                          onChange={this.handleSelectChange}
                        >
                          <option value="Health and Medical">
                            Health and Medical
                          </option>
                          <option value="Business and Finance">
                            Business and Finance
                          </option>
                          <option value="Technical">Technical</option>
                          <option value="Deep Technical- AI/ML/IoT/Cybersecurity">
                            Deep Technical- AI/ML/IoT/Cybersecurity
                          </option>
                          <option value="Lifestyle and Fashion">
                            Lifestyle and Fashion
                          </option>
                          <option value="Nutrition/ Food and Beverage">
                            Nutrition/ Food and Beverage
                          </option>
                          <option value="News Content and/or Entertainment">
                            News Content and/or Entertainment
                          </option>
                          <option value="Travel and Hospitality">
                            Travel and Hospitality
                          </option>
                          <option value="Sports and Recreation">
                            Sports and Recreation
                          </option>
                          <option value="Real Estate">Real Estate</option>
                          <option value="Family-Parenting/Childcare">
                            Family-Parenting/Childcare
                          </option>
                          <option value="Opinionated and Engaging Content">
                            Opinionated and Engaging Content
                          </option>
                          <option value="Education">Education</option>
                          <option value="Astrology and Spiritual">
                            Astrology and Spiritual
                          </option>
                          <option value="Generic">Generic</option>
                          <option value="Other">Other</option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Second Most Prefered Genre">
                      {getFieldDecorator('gender', {
                        rules: [{ required: true, message: 'Please select!' }],
                      })(
                        <Select
                          placeholder="-Select-"
                          onChange={this.handleSelectChange}
                        >
                          <option value="Health and Medical">
                            Health and Medical
                          </option>
                          <option value="Business and Finance">
                            Business and Finance
                          </option>
                          <option value="Technical">Technical</option>
                          <option value="Deep Technical- AI/ML/IoT/Cybersecurity">
                            Deep Technical- AI/ML/IoT/Cybersecurity
                          </option>
                          <option value="Lifestyle and Fashion">
                            Lifestyle and Fashion
                          </option>
                          <option value="Nutrition/ Food and Beverage">
                            Nutrition/ Food and Beverage
                          </option>
                          <option value="News Content and/or Entertainment">
                            News Content and/or Entertainment
                          </option>
                          <option value="Travel and Hospitality">
                            Travel and Hospitality
                          </option>
                          <option value="Sports and Recreation">
                            Sports and Recreation
                          </option>
                          <option value="Real Estate">Real Estate</option>
                          <option value="Family-Parenting/Childcare">
                            Family-Parenting/Childcare
                          </option>
                          <option value="Opinionated and Engaging Content">
                            Opinionated and Engaging Content
                          </option>
                          <option value="Education">Education</option>
                          <option value="Astrology and Spiritual">
                            Astrology and Spiritual
                          </option>
                          <option value="Generic">Generic</option>
                          <option value="Other">Other</option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="Most Prefered Vertical">
                      {getFieldDecorator('gender', {
                        rules: [{ required: true, message: 'Please select!' }],
                      })(
                        <Select
                          placeholder="-Select-"
                          onChange={this.handleSelectChange}
                        >
                          <option value="Blogs and Articles">
                            Blogs and Articles
                          </option>
                          <option value="Website Content">
                            Website Content
                          </option>
                          <option value="Academic/Book Writing">
                            Academic/Book Writing
                          </option>
                          <option value="Press Releases">Press Releases</option>
                          <option value="White Papers">White Papers</option>
                          <option value="Branded Content">
                            Branded Content
                          </option>
                          <option value="Copywriting">Copywriting</option>
                          <option value="Social Media- LinkedIn">
                            Social Media- LinkedIn
                          </option>
                          <option value="Social Media- Facebook">
                            Social Media- Facebook
                          </option>
                          <option value="Social Media- Twitter">
                            Social Media- Twitter
                          </option>
                          <option value="Social Media- Instagram">
                            Social Media- Instagram
                          </option>
                          <option value="Product Descriptions and Reviews">
                            Product Descriptions and Reviews
                          </option>
                          <option value="Corporate Communications Content">
                            Corporate Communications Content
                          </option>
                          <option value="Technical Content Writing- Manuals, Software Testing Guides">
                            Technical Content Writing- Manuals, Software Testing
                            Guides
                          </option>
                          <option value="Others">Others</option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Second Most Prefered Vertical">
                      {getFieldDecorator('gender', {
                        rules: [{ required: true, message: 'Please select!' }],
                      })(
                        <Select
                          placeholder="-Select-"
                          onChange={this.handleSelectChange}
                        >
                          <option value="Blogs and Articles">
                            Blogs and Articles
                          </option>
                          <option value="Website Content">
                            Website Content
                          </option>
                          <option value="Academic/Book Writing">
                            Academic/Book Writing
                          </option>
                          <option value="Press Releases">Press Releases</option>
                          <option value="White Papers">White Papers</option>
                          <option value="Branded Content">
                            Branded Content
                          </option>
                          <option value="Copywriting">Copywriting</option>
                          <option value="Social Media- LinkedIn">
                            Social Media- LinkedIn
                          </option>
                          <option value="Social Media- Facebook">
                            Social Media- Facebook
                          </option>
                          <option value="Social Media- Twitter">
                            Social Media- Twitter
                          </option>
                          <option value="Social Media- Instagram">
                            Social Media- Instagram
                          </option>
                          <option value="Product Descriptions and Reviews">
                            Product Descriptions and Reviews
                          </option>
                          <option value="Corporate Communications Content">
                            Corporate Communications Content
                          </option>
                          <option value="Technical Content Writing- Manuals, Software Testing Guides">
                            Technical Content Writing- Manuals, Software Testing
                            Guides
                          </option>
                          <option value="Others">Others</option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <p style={{ color: '#000000d9' }}> Uploaded CV</p>
                  </Col>
                  <Col span={18}>
                    <hr />
                    <p
                      style={{
                        color: '#16224F',
                        fontWeight: '600',
                        paddingTop: '5px',
                      }}
                    >
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
                <Row gutter={24}>
                  <Col span={24}>
                    <p
                      className="ant-form-item"
                      style={{ marginBottom: '0px', marginTop: '15px' }}
                    >
                      What languages are you proficient in?
                    </p>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="A">Assamese</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="B" checked>
                      English
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="C">Gujarati</Checkbox>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Checkbox value="D" checked>
                      Hindi
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="E">Kannada</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="E">Malayalam</Checkbox>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Checkbox value="D">Mandarin </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="E">Odia</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="E" checked>
                      Punjabi
                    </Checkbox>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Checkbox value="D">Tamil</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="E">Telugu</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="E" checked>
                      Urdu
                    </Checkbox>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Checkbox value="E">European</Checkbox>
                  </Col>
                  <Col span={16}>
                    <Checkbox value="E">
                      Other South-east Asian Languages
                    </Checkbox>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={11}>
              <Card
                type="inner"
                title="Profile Details"
                extra={
                  <a href="./my-profile">
                    <Icon type="close" />
                  </a>
                }
              >
                <Row gutter={24}>
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
                      {getFieldDecorator('wordCount', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input word count',
                          },
                        ],
                      })(<Input placeholder="Rahul" />)}
                    </Form.Item>
                    <Form.Item label="Phone">
                      {getFieldDecorator('wordCount', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input word count',
                          },
                        ],
                      })(<Input placeholder="+91-8586047534" />)}
                    </Form.Item>
                  </Col>
                  <Col span={9}>
                    <Form.Item label="Last Name">
                      {getFieldDecorator('wordCount', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input word count',
                          },
                        ],
                      })(<Input placeholder="Sharma" />)}
                    </Form.Item>
                    <Form.Item label="Email">
                      {getFieldDecorator('wordCount', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input word count',
                          },
                        ],
                      })(<Input placeholder="rhlsharma8@gmail.com" />)}
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="Occupation">
                      {getFieldDecorator('wordCount', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input word count',
                          },
                        ],
                      })(<Input placeholder="Content Writer" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Daily Word Count">
                      {getFieldDecorator('wordCount', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input word count',
                          },
                        ],
                      })(<Input placeholder="15000 WPD" />)}
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
                  <Col span={8}>
                    <Checkbox value="Mon">Mon</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Tue">Tue</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Wed" checked>
                      Wed
                    </Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Checkbox value="Thu">Thu</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Fri" checked>
                      Fri
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Sat" checked>
                      Sat
                    </Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Checkbox value="Sun" checked>
                      Sun
                    </Checkbox>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24} style={{ marginTop: '7px' }}></Col>
                  <Col span={12}>
                    <Row>
                      <Col span={8}>
                        <p
                          className="ant-form-item"
                          style={{ marginBottom: '0px', fontWeight: '600' }}
                        >
                          Writer
                        </p>
                      </Col>
                      <Col span={16}>
                        <Radio.Group onChange={null}>
                          <Radio value={1} checked>
                            Full Time
                          </Radio>
                          <Radio value={2}>Part Time</Radio>
                        </Radio.Group>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <Col span={9}>
                        <p
                          className="ant-form-item"
                          style={{ marginBottom: '0px', fontWeight: '600' }}
                        >
                          Freelancer
                        </p>
                      </Col>
                      <Col span={15}>
                        <Radio.Group onChange={null}>
                          <Radio value={1}>Full Time</Radio>
                          <Radio value={2} checked>
                            Part Time
                          </Radio>
                        </Radio.Group>
                      </Col>
                    </Row>
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
            <Col span={11}>
              <Card
                type="inner"
                title="Experience"
                extra={
                  <a href="./my-profile">
                    <Icon type="close" />
                  </a>
                }
              >
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
                  <Col span={24}>
                    <Form.Item label="Expected Pay? (In Rupees per word)">
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
                <Row>
                  <Col span={24}>
                    <Form.Item label="Previous writing experiences and skillsets.">
                      {getFieldDecorator('audience', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input audience',
                          },
                        ],
                      })(
                        <TextArea
                          style={{ height: '80px' }}
                          placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.."
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item label=" companies that you've worked for in the past">
                      {getFieldDecorator('audience', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input audience',
                          },
                        ],
                      })(
                        <TextArea placeholder="ABA Infotech Pvt. Ltd. (Delhi) Tata Consultancy Service (Gurgaon)" />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Profession you are in, apart from freelance writing">
                      {getFieldDecorator('audience', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input audience',
                          },
                        ],
                      })(
                        <TextArea placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={10}>
              <Card
                type="inner"
                title="Bank Details"
                extra={
                  <a href="./my-profile">
                    <Icon type="close" />
                  </a>
                }
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
                      <span style={{ color: 'red' }}>* </span>Bank & Branch Name
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
                      <span style={{ color: 'red' }}>* </span>IFSC Code
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
                      <span style={{ color: 'red' }}>* </span>PAN Card
                    </p>
                    <Form.Item label="">
                      {getFieldDecorator('panCard', {
                        rules: [
                          {
                            required: true,
                            message: 'Please enter PAN Card.',
                          },
                        ],
                      })(<Input />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}></Col>
                </Row>
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
