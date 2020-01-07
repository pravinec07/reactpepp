import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Modal, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@iso/components/uielements/button';
import Icon from '@iso/components/uielements/icon';
import Spin from '@iso/components/uielements/spin';
import Form from '@iso/components/uielements/form';
import IntlMessages from '@iso/components/utility/intlMessages';

import SignUpStyleWrapper from './SignUp.styles';
import Notification from '@iso/components/Notification';
import userActions from '../../redux/user/actions';
import SignUpForm from './step1';
import ThankYou from './step2';
import OTPInput from './OTPInput';
import { Navigation } from '../../utils/functions';
import { LoginButton } from './LoginButton';
import siteConfig from '@iso/config/site.config';
const styles = {
  footer: {
    marginTop: '20px',
    background: '#ffffff',
    textAlign: 'center',
    borderTop: '1px solid #ededed',
    width: '100%',
    float: 'right',
    position: 'absolute',
    bottom: '-50px',
    padding: '20px',
  },
};
const { signUpRequest } = userActions;
const FormItem = Form.Item;

function SignUp(props) {
  const dev = false;
  const history = useHistory();
  const [formStep, setFormStep] = useState(1);
  const [visible, setVisible] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const { getFieldDecorator } = props.form;

  const dispatch = useDispatch();
  const {
    signUpLoading,
    signUpError,
    sendOtpLoading,
    sendOtpError,
    verifyOtpLoading,
    verifyOtpError,
  } = useSelector(state => state.User);
  useEffect(() => {
    if (sendOtpLoading !== null) {
      if (!sendOtpLoading && !sendOtpError) {
        setVisible(true);
        Notification(
          'success',
          'Success',
          'Please check your email/Mobile  inbox for OTP.'
        );
      } else if (sendOtpError) {
        Notification('error', 'Error', sendOtpError);
      }
    }
  }, [sendOtpLoading, sendOtpError]);
  useEffect(() => {
    if (verifyOtpLoading !== null) {
      if (!verifyOtpLoading && !verifyOtpError) {
        props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            props.form.resetFields(['otp']);
            dispatch(signUpRequest({ ...values }));
          }
        });
      } else if (verifyOtpError) {
        Notification('error', 'Error', verifyOtpError);
      }
    }
  }, [verifyOtpLoading, verifyOtpError]);
  useEffect(() => {
    if (signUpLoading !== null) {
      if (!signUpLoading && !signUpError) {
        setFormStep(2);
        setShowThanks(true);
        props.form.resetFields();
      } else if (signUpError) {
        Notification('error', 'Error', signUpError);
      }
    }
  }, [signUpLoading, signUpError]);

  function handleOTPProcess() {
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(
          userActions.verifyOTPStart({
            params: {
              email: values.email,
              number: `${values.prefix}${values.phoneNumber}`,
              otp: values.otp,
            },
          })
        );
      }
    });
  }

  function handleResendOTP() {
    const val = props.form.getFieldsValue();
    const number = `${val.prefix}${val.phoneNumber}`;
    dispatch(
      userActions.sendOTPStart({ params: { email: val.email, number } })
    );
  }

  function handleNextBackAction(e) {
    e.preventDefault();
    props.form.validateFields(
      [
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'password',
        'confirm',
        'prefix',
        'agreement',
      ],
      (err, values) => {
        if (!err) {
          dispatch(
            userActions.sendOTPStart({
              params: {
                email: values.email,
                number: `${values.prefix}${values.phoneNumber}`,
              },
            })
          );
        }
      }
    );
  }
  const checkOTP = (rule, value, callback) => {
    console.log(rule, value, callback, '--->');
    if (value && value.length === 6) {
      return callback();
    } else if (!value) {
      callback('Please enter OTP');
    } else if (value.length < 7) {
      callback('Please enter full otp');
    }
  };
  function handleCancel() {
    props.form.resetFields(['otp']);
    setVisible(false);
    setShowThanks(false);
  }
  function navigationTo(params) {
    Navigation(params, history);
    props.form.resetFields();
    setVisible(false);
    setShowThanks(false);
    setFormStep(1);
  }
  return (
    <SignUpStyleWrapper className="isoSignUpPage">
      <div className="pepper_heading">
        <h1>Pepper Creator Zone</h1>
      </div>
      <Modal
        visible={visible}
        onOk={handleOTPProcess}
        onCancel={() => handleCancel()}
        maskClosable={false}
        footer={
          !showThanks && [
            <Button
              key="button"
              type="danger"
              onClick={() => handleResendOTP()}
              loading={verifyOtpLoading}
            >
              Resend OTP
            </Button>,
            <Button
              type="primary"
              loading={verifyOtpLoading}
              onClick={handleOTPProcess}
            >
              Verify
            </Button>,
          ]
        }
      >
        <Spin tip="Loading..." spinning={verifyOtpLoading}>
          {!showThanks && (
            <Form
              layout="vertical"
              onSubmit={handleOTPProcess}
              style={{ padding: '50px 30px' }}
            >
              <p
                style={{
                  color: '#16224F',
                  fontWeight: '600',
                  fontSize: '20px',
                  textAlign: 'center',
                  marginBottom: '10px',
                }}
              >
                We have sent you a verification code on your registered Email
                and Phone Number
              </p>
              <p
                style={{
                  color: '#333333',
                  fontWeight: '600',
                  fontSize: '16px',
                  textAlign: 'left',
                  marginBottom: '10px',
                }}
              >
                Please fill the code below
              </p>
              <Row gutter={24}>
                <Form.Item>
                  {getFieldDecorator('otp', {
                    rules: [{ validator: checkOTP }],
                  })(<OTPInput />)}
                </Form.Item>
              </Row>
            </Form>
          )}
          {verifyOtpError && (
            <p
              style={{
                fontWeight: '600',
                fontSize: '22px',
                textAlign: 'center',
                margin: '20px 50px ',
                border: '2px solid red',
                padding: '8px 11px',
              }}
            >
              OTP Doesn't match. Retry it.
            </p>
          )}
          {showThanks && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <p
                style={{
                  color: '#16224F',
                  fontWeight: '600',
                  fontSize: '20px',
                  textAlign: 'center',
                  marginBottom: '10px',
                }}
              >
                <Icon
                  type="check"
                  style={{
                    color: 'green',
                    fontSize: '20px',
                    fontWeight: '600',
                  }}
                />
                Please login using your registered email id & password
              </p>
              <LoginButton navigationTo={navigationTo} />
            </div>
          )}
        </Spin>
      </Modal>
      <div className="isoSignUpContentWrapper">
        <div className="isoSignUpContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.signUpTitle" />
            </Link>
          </div>
          <div className="isoSignUpForm">
            {formStep === 1 && (
              <Form layout="vertical" onSubmit={handleNextBackAction}>
                <SignUpForm
                  form={props.form}
                  loading={signUpLoading || verifyOtpLoading || signUpLoading}
                />

                <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                  <Link to="/signin">
                    <IntlMessages id="page.signUpAlreadyAccount" />
                  </Link>
                </div>
              </Form>
            )}
            {formStep === 2 && [
              <ThankYou />,
              <LoginButton navigationTo={navigationTo} />,
            ]}
          </div>
        </div>
      </div>
      <div style={styles.footer}>{siteConfig.writer.footerText}</div>
    </SignUpStyleWrapper>
  );
}

const WrappedFormWIthSignUp = Form.create()(SignUp);
export default WrappedFormWIthSignUp;
