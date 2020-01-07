import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Row, Col, Card, Button, Select, Collapse } from 'antd';
import Upload from '@iso/components/uielements/upload';
import Input, { Textarea } from '@iso/components/uielements/input';
// import Button from "@iso/components/uielements/button";
import Checkbox from '@iso/components/uielements/checkbox';
import message from '@iso/components/uielements/message';
import Modal from '@iso/components/uielements/modal';
import Radio from '@iso/components/uielements/radio';
import Form from '@iso/components/uielements/form';
import Notification from '@iso/components/Notification';
import userActions from '../../redux/user/actions';
import { DAYS, NO_DATA } from '../../config/Constants';
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
function ProfileDetails({ ...props }) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };
  const handleChange = () => {};
  // onChange(info) {
  //   if (info.file.status !== "uploading") {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === "done") {
  //     message.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === "error") {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // }
  const Auth = useSelector(state => state.Auth);
  const {
    getProfileLoading,
    getProfileResponse,
    getProfileError,
  } = useSelector(state => state.User);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch();
        // updateProfileStart({
        //   ...values,
        //   accessToken: Auth.idToken.sessionToken,
        // })
      }
    });
  };
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
        setUserData(getProfileResponse);
      } else if (getProfileError) {
        Notification('error', 'Error in Get Profile deatils', getProfileError);
      }
    }
  }, [getProfileLoading, getProfileResponse, getProfileError]);
  // const handleSubmit = e => {
  //   e.preventDefault();
  //   props.form.validateFieldsAndScroll((err, values) => {
  //     if (!err) {
  //       console.log("Received values of form: ", values);
  //     }
  //   });
  // };

  const uploadButton = () => (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const { getFieldDecorator } = props.form;
  console.log(userData, 'hello');
  return (
    <>
      <Form
        layout="vertical"
        onSubmit={handleSubmit}
        style={{ padding: '0px 20px 20px 20px' }}
      >
        <h2 style={{ margin: '10px 0px' }}>Writer Details</h2>
        <Row gutter={12}>
          <Col span={11}>
            <Card
              type="inner"
              title="Basic Information"
              extra={
                <a href="#">
                  <Icon type="edit" />
                </a>
              }
            >
              <Row>
                <Col span={12}>
                  <Form.Item label="Most Prefered Genre">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.genre1 || NO_DATA.na}
                    </p>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Second Most Prefered Genre">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.genre2 || NO_DATA.na}
                    </p>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="Most Prefered Vertical">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.vertical1 || NO_DATA.na}
                    </p>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Second Most Prefered Vertical">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.vertical2 || NO_DATA.na}
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
                    resume.docx -{' '}
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
                  <p
                    style={{
                      color: '#000000d9',
                      marginBottom: '10px',
                      marginTop: '12px',
                    }}
                  >
                    Languages you are proficient in
                  </p>
                </Col>
              </Row>
              {(userData.languages || []).map((item, key) => (
                <Col key={`language${key}`} span={12}>
                  <Checkbox checked>{item}</Checkbox>
                </Col>
              ))}
            </Card>
          </Col>
          <Col span={11}>
            <Card
              type="inner"
              title="Profile Details"
              extra={
                <a href="#">
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
                <Col span={8}>
                  <Form.Item label="First Name">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.name || NO_DATA.na}{' '}
                      {userData.lastname || NO_DATA.na}
                    </p>
                  </Form.Item>
                  <Form.Item label="Phone">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.phoneNumber || NO_DATA.na}
                    </p>
                  </Form.Item>
                </Col>
                <Col span={9}>
                  <Form.Item label="Last Name">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.lastname || NO_DATA.na}
                    </p>
                  </Form.Item>
                  <Form.Item label="Email">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.email || NO_DATA.na}
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
                      {userData.occupation || NO_DATA.na}
                    </p>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Daily Word Count">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.dailyWordCount || NO_DATA.na} WPD
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
                {(userData.availability || []).map((item, key) => (
                  <Col key={`availablity${key}`} span={6}>
                    <Checkbox
                      value={item}
                      checked
                      style={{ color: '#16224F', fontWeight: '600' }}
                    >
                      {item}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
              <Row>
                <Col span={24} style={{ marginTop: '10px' }}></Col>
                <Col span={5}>
                  <p className="ant-form-item" style={{ marginBottom: '0px' }}>
                    Writer
                  </p>
                </Col>
                <Col span={7}>
                  <Radio.Group
                    onChange={null}
                    style={{ color: '#16224F', fontWeight: '600' }}
                  >
                    <Radio value={1} checked>
                      {userData.writer || NO_DATA.na}
                    </Radio>
                  </Radio.Group>
                </Col>
                <Col span={5}>
                  <p className="ant-form-item" style={{ marginBottom: '0px' }}>
                    Freelancer
                  </p>
                </Col>
                <Col span={7}>
                  <Radio.Group
                    onChange={null}
                    style={{ color: '#16224F', fontWeight: '600' }}
                  >
                    <Radio value={1} checked>
                      {userData.freelancer || NO_DATA.na}
                    </Radio>
                  </Radio.Group>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ marginTop: '20px' }}></Col>
        </Row>
        <Row gutter={12}>
          <Col span={11}>
            <Card
              type="inner"
              title="Experience"
              extra={
                <a href="#">
                  <Icon type="edit" />
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
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.expectedPay || NO_DATA.na}
                    </p>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item label="Previous writing experiences and skillsets.">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.writingSkillSet || NO_DATA.na}

                      {/* <a href="">Read more..</a> */}
                    </p>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item label=" companies that you've worked for in the past">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.pastCompanies || NO_DATA.na}
                      <span
                        style={{
                          color: '#adadad',
                          fontSize: '12px',
                          fontWeight: '400',
                        }}
                      ></span>
                    </p>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item label="Profession you are in, apart from freelance writing">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.currentProfession || NO_DATA.na}
                      {/* <a href="">Read more..</a> */}
                    </p>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={11}>
            <Card
              type="inner"
              title="Bank Details"
              extra={
                <a href="#">
                  <Icon type="edit" />
                </a>
              }
            >
              <Row>
                <Col span={24} style={{ marginTop: '10px' }}></Col>
                <Col span={12}>
                  <Form.Item label="A/c Number">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.accountNumber || NO_DATA.na}
                    </p>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="A/c Holder Name">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.accountHolder || NO_DATA.na}
                    </p>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="Bank Name">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.bankName || NO_DATA.na}
                    </p>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Branch Name">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.branchName || NO_DATA.na}
                    </p>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="IFSC Code">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.ifscCode || NO_DATA.na}
                    </p>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="PAN Card">
                    <p style={{ color: '#16224F', fontWeight: '600' }}>
                      {userData.pancard || NO_DATA.na}
                    </p>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
}

const WrappedProfileDetails = Form.create({ name: 'profile' })(ProfileDetails);

export default WrappedProfileDetails;
