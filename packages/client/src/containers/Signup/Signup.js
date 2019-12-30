import React, { Fragment } from 'react';
import { Form, Card, Modal, Input, Button } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Step1 from './Step1';
import Step2 from './Step2';
import FormWrapper, { CardStyles } from './Signup.styles';
import action from './actions';
import { PUBLIC_ROUTE } from '../../route.constants';

function Signup(props) {
  const dispatch = useDispatch();
  const signupResponse = useSelector(state => state.signup);
  const [identityType, setIdentityType] = React.useState('business');
  const [confirmDirty, setConfirmDirty] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [OTPErr, setOTPErr] = React.useState(false);
  const [showThanks, setShowThanks] = React.useState(false);
  const [isAgreement, setAgreement] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const { getFieldDecorator } = props.form;

  console.log('=====>>', signupResponse);
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
          dispatch(action.fetchSignUpSaveStart({ ...values, phoneNumber: ph }));
        }
      });
    }
  }, [signupResponse.isOtpSuccessful]);

  function handleOTPProcess() {
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(
          action.verifyOTPStart({
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
      action.resendOTPStart({ params: { email: val.email, number: ph } })
    );
  }

  function handleNextBackAction() {
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(
          action.sendOTPStart({
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

  function handleRadioChange(e) {
    e.preventDefault();
    switch (e.target.name) {
      case 'identification': {
        setIdentityType(e.target.value);
        break;
      }
      case 'agreement': {
        setAgreement(e.target.checked);
        break;
      }
    }
  }

  function handleCancel() {
    setVisible(false);
  }
  const checkPassword = (rule, value, callback) => {
    const form = props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent.');
    } else {
      callback();
    }
  };
  const checkConfirm = (rule, value, callback) => {
    const form = props.form;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  const handleConfirmBlur = e => {
    const value = e.target.value;
    setConfirmDirty(confirmDirty => confirmDirty || !!value);
  };
  return (
    <FormWrapper>
      <Modal
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
        {!signupResponse.isOtpSuccessful && (
          <div>OTP doesn't match. retry it.</div>
        )}
        {signupResponse.isOtpSuccessful && showThanks && (
          <div>
            <p>Thankyou for sign up!!!</p>
            <Link to={PUBLIC_ROUTE.SIGN_IN}>Login</Link>
          </div>
        )}
      </Modal>
      <Card styles={{ CardStyles }}>
        <div className="isoSignupContentWrapper">
          <Form
            layout="vertical"
            onSubmit={handleNextBackAction}
            style={{ padding: '50px 100px' }}
          >
            <Step1
              data={props}
              identityType={identityType}
              handleRadioChange={handleRadioChange}
              handleNextBackAction={handleNextBackAction}
              checkConfirm={checkConfirm}
              handleConfirmBlur={handleConfirmBlur}
              checkPassword={checkPassword}
              isAgreement={isAgreement}
            />
          </Form>
        </div>
      </Card>
    </FormWrapper>
  );
}

const SignupForm = Form.create({ name: 'signup' })(Signup);

export default SignupForm;
