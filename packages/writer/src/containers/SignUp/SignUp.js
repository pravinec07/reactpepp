import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@iso/components/uielements/button';
import Icon from '@iso/components/uielements/icon';
import Input from '@iso/components/uielements/input';
import Spin from '@iso/components/uielements/spin';
import Form from '@iso/components/uielements/form';
import IntlMessages from '@iso/components/utility/intlMessages';

import SignUpStyleWrapper from './SignUp.styles';
import Notification from '@iso/components/Notification';
import userActions from '../../redux/user/actions';
import SignUpForm from './step1';
import ThankYou from './step2';
import { PUBLIC_ROUTE } from '../../route.constants';
import OTPInput from './OTPInput';

const { signUpRequest } = userActions;
const FormItem = Form.Item;

function SignUp(props) {
  const dev = false;
  const [formStep, setFormStep] = React.useState(1);
  const [visible, setVisible] = React.useState(false);
  const [OTPErr, setOTPErr] = React.useState(false);
  const [showThanks, setShowThanks] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
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
        setOTPErr(false);
        props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            dispatch(userActions.signUpRequest({ ...values }));
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
        props.form.reset();
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
    if (value && value.length === 6) {
      return callback();
    } else if (!value) {
      callback('Please enter OTP');
    } else if (value.length < 7) {
      callback('Please enter full otp');
    }
  };
  function handleCancel() {
    setVisible(false);
  }

  return (
    <SignUpStyleWrapper className="isoSignUpPage">
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
            >
              Resend OTP
            </Button>,
            <Button type="primary" loading={loading} onClick={handleOTPProcess}>
              Submit
            </Button>,
          ]
        }
      >
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
              We have sent you a verification code on your registered Email and
              Phone Number
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
          <div>
            <Spin tip="Loading..." spinning={verifyOtpLoading}>
              <p
                style={{
                  color: '#16224F',
                  fontWeight: '600',
                  fontSize: '20px',
                  textAlign: 'center',
                  marginBottom: '10px',
                }}
              >
                {' '}
                <Icon
                  type="check"
                  style={{
                    color: 'green',
                    fontSize: '20px',
                    fontWeight: '600',
                  }}
                />{' '}
                Please login using your registered email id & password
              </p>
              <Link to={PUBLIC_ROUTE.SIGN_IN}>
                <p
                  style={{
                    fontWeight: '600',
                    fontSize: '22px',
                    textAlign: 'center',
                    margin: '20px 50px ',
                    border: '2px solid #096DD9',
                    padding: '8px 11px',
                  }}
                >
                  Login
                </p>
              </Link>
            </Spin>
          </div>
        )}
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
                <SignUpForm form={props.form} dev={dev} />
                <>
                  <FormItem>
                    <Button
                      loading={
                        sendOtpLoading || verifyOtpLoading || signUpLoading
                      }
                      type="primary"
                      htmlType="submit"
                    >
                      <IntlMessages id="page.signUpButton" />
                    </Button>
                  </FormItem>
                </>
                <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                  <Link to="/signin">
                    <IntlMessages id="page.signUpAlreadyAccount" />
                  </Link>
                </div>
              </Form>
            )}
            {formStep === 2 && <ThankYou />}
          </div>
        </div>
      </div>
    </SignUpStyleWrapper>
  );
}

const WrappedFormWIthSignUp = Form.create()(SignUp);
export default WrappedFormWIthSignUp;
