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
import ThankYou from './step7';
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
  const signupResponse = useSelector(state => state.User);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // dispatch(signUpRequest(values));
        dispatch(
          userActions.sendOTPStart({
            params: {
              email: values.email,
              number: `${values.prefix}${values.phoneNumber}`,
            },
          })
        );
        setVisible(true);
      }
    });
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 24,
        offset: 0,
      },
    },
  };

  useEffect(() => {
    if (signupResponse.signUpLoading !== null) {
      if (!signupResponse.signUpLoading && !signupResponse.signUpError) {
        setFormStep(formStep + 1);
      } else if (signupResponse.signUpError) {
        Notification('error', 'Error', signupResponse.signUpError);
      }
      console.log('property changed', signupResponse.signUpLoading);
    }
  }, [signupResponse.signUpLoading, signupResponse.signUpError]);

  React.useEffect(() => {
    if (
      signupResponse.isOtpSuccessful !== 'notStarted' &&
      signupResponse.isOtpSuccessful
    ) {
      setOTPErr(false);
      setShowThanks(true);
      props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const ph = `${values.prefix}${values.phoneNumber}`;
          dispatch(userActions.signUpRequest({ ...values, phoneNumber: ph }));
        }
      });
    }
  }, [signupResponse.isOtpSuccessful]);

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
    const ph = `${val.prefix}${val.phoneNumber}`;
    dispatch(
      userActions.resendOTPStart({ params: { email: val.email, number: ph } })
    );
  }

  function handleNextBackAction(e) {
    e.preventDefault();
    props.form.validateFields(
      [
        'identifyType',
        'companyName',
        'email',
        'phoneNumber',
        'password',
        'confirm',
        'prefix',
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
          setVisible(true);
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
        footer={
          signupResponse.isOtpSuccessful === 'notStarted' && [
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
        {signupResponse.isOtpSuccessful === 'notStarted' && (
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
        {!signupResponse.isOtpSuccessful && (
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
            {Notification('error', 'Error', signupResponse.error.message)}
          </p>
        )}
        {signupResponse.isOtpSuccessful && showThanks && (
          <div>
            <Spin tip="Loading..." spinning={signupResponse.verifyLoading}>
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

      {/* <Modal
        visible={visible}
        onOk={handleOTPProcess}
        onCancel={() => handleCancel()}
        footer={
          signupResponse.isOtpSuccessful &&
          !showThanks && [
            <Button key="back" onClick={() => handleResendOTP()}>
              Resend
            </Button>,
            <Button type="primary" loading={loading} onClick={handleOTPProcess}>
              Submit
            </Button>,
          ]
        }
      >
        {signupResponse.isOtpSuccessful === 'notStarted' && (
          <Form
            layout="vertical"
            onSubmit={handleOTPProcess}
            style={{ padding: '50px 100px' }}
          >
            <Form.Item label="Please input OTP">
              {getFieldDecorator('otp', {
                rules: [
                  {
                    required: false,
                    message: 'Please input otp',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Form>
        )}
        {!signupResponse.isOtpSuccessful && <div>OTP doesn't match. retry it.</div>}
        {signupResponse.isOtpSuccessful && showThanks && (
          <div>
            <p>Thankyou for sign up!!!</p>
            <Link to={PUBLIC_ROUTE.SIGN_IN}>Login</Link>
          </div>
        )}
      </Modal> */}
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
                  <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
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
