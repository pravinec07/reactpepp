import React, { Fragment } from 'react';
import { Form, Card, Modal, Input, Button, Row, Col, Icon } from 'antd';
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
            <Button key="back" type="danger" onClick={() => handleResendOTP()}>
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
              We have sent you a verification code on your registered Email
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
              <Col span={4}>
                <Form.Item label="">
                  {getFieldDecorator('otp', {
                    rules: [
                      {
                        required: false,
                        message: 'Please input otp',
                      },
                    ],
                  })(<Input size="large" />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="">
                  {getFieldDecorator('otp', {
                    rules: [
                      {
                        required: false,
                        message: 'Please input otp',
                      },
                    ],
                  })(<Input size="large" />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="">
                  {getFieldDecorator('otp', {
                    rules: [
                      {
                        required: false,
                        message: 'Please input otp',
                      },
                    ],
                  })(<Input size="large" />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="">
                  {getFieldDecorator('otp', {
                    rules: [
                      {
                        required: false,
                        message: 'Please input otp',
                      },
                    ],
                  })(<Input size="large" />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="">
                  {getFieldDecorator('otp', {
                    rules: [
                      {
                        required: false,
                        message: 'Please input otp',
                      },
                    ],
                  })(<Input size="large" />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="">
                  {getFieldDecorator('otp', {
                    rules: [
                      {
                        required: false,
                        message: 'Please input otp',
                      },
                    ],
                  })(<Input size="large" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
        {!signupResponse.isOtpSuccessful && (
          <div>OTP doesn't match. retry it.</div>
        )}
        {signupResponse.isOtpSuccessful && showThanks && (
          <div>
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
                style={{ color: 'green', fontSize: '20px', fontWeight: '600' }}
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
          </div>
        )}
      </Modal>
      <Card styles={{ CardStyles }}>
        <div className="isoSignupContentWrapper">
          <Form
            layout="vertical"
            onSubmit={handleNextBackAction}
            style={{ padding: '50px 50px' }}
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
