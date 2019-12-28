import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@iso/components/uielements/button';
import Form from '@iso/components/uielements/form';
import IntlMessages from '@iso/components/utility/intlMessages';
import SignUpStyleWrapper from './SignUp.styles';
import Steps from '@iso/components/uielements/steps';

import Notification from '@iso/components/Notification';
import userActions from '../../redux/user/actions';
import Step1 from './step1';
// import Step2 from "./step2";
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';
import Step6 from './step6';
import Step7 from './step7';

const { signUpRequest } = userActions;
const FormItem = Form.Item;
const { Step } = Steps;

let formValues = {};
function SignUp(props) {
  const dev = true;
  const [formStep, setFormStep] = React.useState(1);
  const dispatch = useDispatch();
  const response = useSelector(state => state.User);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        formValues = { ...formValues, ...values };
        if (formStep === 6) {
          dispatch(signUpRequest(formValues));
        } else {
          setFormStep(formStep + 1);
        }
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

  const actionBution = step => {
    switch (step) {
      case 1: {
        return (
          <>
            <FormItem {...tailFormItemLayout}></FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </FormItem>
          </>
        );
      }
      case 6: {
        return (
          <>
            <FormItem {...tailFormItemLayout}>
              <Button
                onClick={() => setFormStep(formStep - 1)}
                type="primary"
                htmlType="button"
              >
                Back
              </Button>
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                <IntlMessages id="page.signUpButton" />
              </Button>
            </FormItem>
          </>
        );
      }
      default: {
        return (
          <>
            <FormItem {...tailFormItemLayout}>
              <Button
                onClick={() => setFormStep(formStep - 1)}
                type="primary"
                htmlType="button"
              >
                Back
              </Button>
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </FormItem>
          </>
        );
      }
    }
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
  return (
    <SignUpStyleWrapper className="isoSignUpPage">
      <div className="isoSignUpContentWrapper">
        <div className="isoSignUpContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.signUpTitle" />
            </Link>
          </div>
          <Steps
            size="small"
            current={formStep - 1}
            style={{ marginBottom: 20 }}
          >
            <Step />
            <Step />
            <Step />
            <Step />
            <Step />
            <Step />
            <Step />
          </Steps>
          <div className="isoSignUpForm">
            <Form layout="vertical" onSubmit={handleSubmit}>
              {formStep === 1 && <Step1 form={props.form} dev={dev} />}
              {formStep === 2 && <div>Otp Screen</div>}
              {formStep === 3 && <Step3 form={props.form} dev={dev} />}
              {formStep === 4 && <Step4 form={props.form} dev={dev} />}
              {formStep === 5 && <Step5 form={props.form} dev={dev} />}
              {formStep === 6 && <Step6 form={props.form} dev={dev} />}
              {formStep === 7 ? (
                <Step7 form={props.form} dev={dev} />
              ) : (
                <div className="isoInputWrapper isoLeftRightComponent">
                  {actionBution(formStep)}
                </div>
              )}
              <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                <Link to="/signin">
                  <IntlMessages id="page.signUpAlreadyAccount" />
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </SignUpStyleWrapper>
  );
}

const WrappedFormWIthSignUp = Form.create()(SignUp);
export default WrappedFormWIthSignUp;
