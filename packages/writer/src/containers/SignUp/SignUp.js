import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@iso/components/uielements/button';
import Form from '@iso/components/uielements/form';
import IntlMessages from '@iso/components/utility/intlMessages';
import SignUpStyleWrapper from './SignUp.styles';
import Notification from '@iso/components/Notification';
import userActions from '../../redux/user/actions';
import SignUpForm from './step1';
import ThankYou from './step7';
import { PUBLIC_ROUTE } from '../../route.constants';

const { signUpRequest } = userActions;
const FormItem = Form.Item;

function SignUp(props) {
  const dev = true;
  const [formStep, setFormStep] = React.useState(1);
  const [visible, setVisible] = React.useState(false);
  const [OTPErr, setOTPErr] = React.useState(false);
  const [showThanks, setShowThanks] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { getFieldDecorator } = props.form;

  const dispatch = useDispatch();
  const response = useSelector(state => state.User);
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
    if (response.signUpLoading !== null) {
      if (!response.signUpLoading && !response.signUpError) {
        setFormStep(formStep + 1);
      } else if (response.signUpError) {
        Notification('error', 'Error', response.signUpError);
      }
      console.log('property changed', response.signUpLoading);
    }
  }, [response.signUpLoading, response.signUpError]);

  React.useEffect(() => {
    if (response.isOtpSuccessful !== 'notStarted' && response.isOtpSuccessful) {
      setOTPErr(false);
      setShowThanks(true);
      props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const ph = `${values.prefix}${values.phoneNumber}`;
          dispatch(userActions.signUpRequest({ ...values, phoneNumber: ph }));
        }
      });
    }
  }, [response.isOtpSuccessful]);

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

  function handleNextBackAction() {
    props.form.validateFieldsAndScroll((err, values) => {
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
    });
  }

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
          response.isOtpSuccessful &&
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
        {response.isOtpSuccessful === 'notStarted' && (
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
        {!response.isOtpSuccessful && <div>OTP doesn't match. retry it.</div>}
        {response.isOtpSuccessful && showThanks && (
          <div>
            <p>Thankyou for sign up!!!</p>
            <Link to={PUBLIC_ROUTE.SIGN_IN}>Login</Link>
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
              <Form layout="vertical" onSubmit={handleSubmit}>
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
