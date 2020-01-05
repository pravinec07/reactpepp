import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Row, Col, Card } from 'antd';
import Upload from '@iso/components/uielements/upload';
import Input, { Textarea } from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import Checkbox from '@iso/components/uielements/checkbox';
import message from '@iso/components/uielements/message';
import Modal from '@iso/components/uielements/modal';
import Radio from '@iso/components/uielements/radio';
import Form from '@iso/components/uielements/form';
import Notification from '@iso/components/Notification';
import Select, { SelectOption } from '@iso/components/uielements/select';
import userActions from '../../redux/user/actions';
import { DAYS } from '../../config/Constants';
const { Dragger } = Upload;
const FormItem = Form.Item;
const { updateProfileStart } = userActions;

function ProfileVerify({ ...props }) {
  const dispatch = useDispatch();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
  };

  const handleChange = () => {};
  const onChange = info => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  const Auth = useSelector(state => state.Auth);

  const {
    updateProfileLoading,
    updateProfileError,
    getProfileLoading,
    getProfileResponse,
    getProfileError,
  } = useSelector(state => state.User);
  useEffect(() => {
    dispatch(
      userActions.getProfileStart({
        username: Auth.idToken.userData.email,
        accessToken: Auth.idToken.sessionToken,
      })
    );
  }, []);
  useEffect(() => {
    if (getProfileLoading !== null) {
      if (!getProfileLoading && !getProfileError) {
      } else if (getProfileError) {
        Notification('error', 'Error in Get Profile deatils', getProfileError);
      }
    }
  }, [getProfileLoading, getProfileResponse, getProfileError]);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(
          updateProfileStart({
            ...getProfileResponse,
            ...values,
            writerForm: false,
            zohoForm: false,
            accessToken: Auth.idToken.sessionToken,
          })
        );
      }
    });
  };
  function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  useEffect(() => {
    if (updateProfileLoading !== null) {
      if (!updateProfileLoading && !updateProfileError) {
        Notification('success', 'Success', 'Profile Completed Successfully.');
      } else if (updateProfileError) {
        Notification('error', 'Error', updateProfileError);
      }
      console.log('property changed', updateProfileLoading);
    }
  }, [updateProfileLoading, updateProfileError]);

  const uploadButton = () => (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const { getFieldDecorator, getFieldsError } = props.form;
  return (
    <>
      <Row>
        <Col span={5}></Col>
        <Col span={14}>
          <h2 style={{ margin: '10px 0px', textAlign: 'center' }}>
            Complete Writer Details
          </h2>
          <Form layout="vertical" onSubmit={handleSubmit}>
            <Card
              type="inner"
              title="Writer Details"
              style={{ margin: '20px 0px' }}
            >
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
                    // fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {uploadButton()}
                  </Upload>
                  <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={handleCancel}
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
                      <Textarea
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
                    })(<Input placeholder="Occupation" />)}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <FormItem label="Weekday Availability">
                    {getFieldDecorator('availability', {
                      required: true,
                      message: 'Please tick your availability',
                    })(<Checkbox.Group options={DAYS} />)}
                  </FormItem>
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
                    {getFieldDecorator('dailyWordCount', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input word count',
                        },
                      ],
                    })(<Input type="number" placeholder="Daily Word Count" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24} style={{ marginTop: '15px' }}></Col>
                <Col span={12}>
                  <Form.Item label="Writer">
                    {getFieldDecorator('writer', {
                      rules: [
                        {
                          required: true,
                          message: 'Select one option.',
                        },
                      ],
                    })(
                      <Radio.Group>
                        <Radio value="FullTime">Full Time</Radio>
                        <Radio value="PartTime">Part Time</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Row>
                    <Col span={24}>
                      <Form.Item label="Freelancer">
                        {getFieldDecorator('freelancer', {
                          rules: [
                            {
                              required: true,
                              message: 'Select one option.',
                            },
                          ],
                        })(
                          <Radio.Group>
                            <Radio value="FullTime">Full Time</Radio>
                            <Radio value="PartTime">Part Time</Radio>
                          </Radio.Group>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
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
                    {getFieldDecorator('accountNumber', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter A/c number',
                        },
                      ],
                    })(<Input placeholder="A/c Number" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    <span style={{ color: 'red' }}>* </span>A/c Holder Name
                  </p>
                  <Form.Item label="">
                    {getFieldDecorator('accountHolder', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter A/c Name',
                        },
                      ],
                    })(<Input placeholder="A/c Holder Name" />)}
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
                    })(<Input placeholder="Bank Name" />)}
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
                    })(<Input placeholder="Branch Name" />)}
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
                    })(<Input placeholder="IFSC Code" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    <span style={{ color: 'red' }}>* </span>PAN Card
                  </p>
                  <Form.Item label="">
                    {getFieldDecorator('pancard', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter PAN Card',
                        },
                      ],
                    })(<Input placeholder="PAN Card" />)}
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Row>
              <Col
                span={24}
                style={{ textAlign: 'center', marginBottom: '10px' }}
              >
                <Form.Item>
                  <Button
                    disabled={hasErrors(getFieldsError())}
                    loading={updateProfileLoading}
                    type="danger"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={5}></Col>
      </Row>
    </>
  );
}

const WrappedProfileVerify = Form.create({ name: 'profile' })(ProfileVerify);

export default WrappedProfileVerify;
