import React, { Fragment } from 'react';
import { Form, Card, Modal, Input, Button } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Step1 from './Step1';
import Step2 from './Step2';
import FormWrapper, { CardStyles } from './Signup.styles';
import action from './actions';
import { PUBLIC_ROUTE } from '../../route.constants';

let fullData;
function Signup(props) {
  const dispatch = useDispatch();
  const signupResponse = useSelector(state => state.signup);
  const [current, setCurrent] = React.useState(1);
  const [visible, setVisible] = React.useState(false);
  const [OTPErr, setOTPErr] = React.useState(false);
  const [confirmDirty, setConfirmDirty] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [radios, setRadios] = React.useState({ primaryIndustry: 0 });
  const { getFieldDecorator } = props.form;

  function handleBlur(e) {
    const { value, name } = e.target;
    console.log(
      'hello',
      e.target,
      props.form,
      props.form.setFieldsvalue(
        'phoneNumber',
        props.form.getFieldValue('prefix') + value
      )
    );
    if (name === 'phoneNumber') {
      console.log(e.target);
    }
    setConfirmDirty(confirmDirty || !!value);
  }

  React.useEffect(() => {
    if (signupResponse.isOtpSuccessful) {
      setCurrent(current + 1);
    } else {
      setOTPErr(true);
    }
  }, [signupResponse.isOtpSuccessful]);

  function handleOTPProcess() {
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(action.verifyOTPStart(values));
      }
    });
  }

  function handleResendOTP() {
    console.log('in resend otp', fullData);
    const ph = `${fullData.prefix}${fullData.phoneNumber}`;
    dispatch(action.sendOTPStart({ email: fullData.email, number: ph }));
  }

  function handleNextBackAction(val, isSubmit) {
    if (val > 0) {
      props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          fullData = { ...fullData, ...values };
          if (current === 1) {
            dispatch(
              action.sendOTPStart({
                email: fullData.email,
                number: fullData.phoneNumber,
              })
            );
            setVisible(true);
          }

          if (isSubmit) {
            console.log(fullData);
            const ph = `${fullData.prefix}${fullData.phoneNumber}`;
            fullData = {
              ...fullData,
              phoneNumber: ph,
              volumeofContent: fullData.volumeofContent
                ? JSON.stringify(fullData.volumeofContent)
                : '',
              estimatedMonthlyBudget: fullData.estimatedMonthlyBudget
                ? JSON.stringify(fullData.estimatedMonthlyBudget)
                : '',
              marketingType: fullData.marketingType
                ? JSON.stringify(fullData.marketingType)
                : '',
            };
            console.log('full data', fullData);
            dispatch(action.fetchSignUpSaveStart(fullData));
          }
        }
      });
    } else {
      setCurrent(current + val);
    }
  }

  function handleRadioChange(e) {
    e.preventDefault();
    switch (e.target.name) {
      case 'identification': {
        setRadios({ ...radios, identification: e.target.value });
        break;
      }
      case 'primaryIndustry': {
        setRadios({ ...radios, primaryIndustry: e.target.value });
        break;
      }
      case 'isLanguage': {
        setRadios({ ...radios, isLanguage: e.target.value });
        break;
      }
    }
  }

  function handleCancel() {
    setVisible(false);
  }

  return (
    <FormWrapper>
      <Modal
        visible={visible}
        onOk={handleOTPProcess}
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleResendOTP()}>
            Resend
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOTPProcess}
          >
            Submit
          </Button>,
        ]}
      >
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
      </Modal>
      <Card styles={{ CardStyles }}>
        <div className="isoSignupContentWrapper">
          <Form
            layout="vertical"
            onSubmit={handleNextBackAction}
            style={{ padding: '50px 100px' }}
          >
            {current === 1 && (
              <Step1
                data={props}
                radios={radios}
                handleRadioChange={handleRadioChange}
                handleNextBackAction={handleNextBackAction}
                handleBlur={handleBlur}
              />
            )}
            {current === 2 && (
              <Step2
                data={props}
                handleNextBackAction={handleNextBackAction}
                radios={radios}
                handleRadioChange={handleRadioChange}
                identityType={radios.identification}
              />
            )}
            {current === 3 && (
              <div>
                <p>Thankyou for sign up!!!</p>
                <Link to={PUBLIC_ROUTE.SIGN_IN}>Login</Link>
              </div>
            )}
          </Form>
        </div>
      </Card>
    </FormWrapper>
  );
}

const SignupForm = Form.create({ name: 'signup' })(Signup);

export default SignupForm;
