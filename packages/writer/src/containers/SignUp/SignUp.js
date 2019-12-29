import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@iso/components/uielements/button';
import Form from '@iso/components/uielements/form';
import IntlMessages from '@iso/components/utility/intlMessages';
import SignUpStyleWrapper from './SignUp.styles';
import Notification from '@iso/components/Notification';
import userActions from '../../redux/user/actions';
import SignUpForm from './step1';

const { signUpRequest } = userActions;
const FormItem = Form.Item;

function SignUp(props) {
  const dev = true;
  const [formStep, setFormStep] = React.useState(1);
  const dispatch = useDispatch();
  const response = useSelector(state => state.User);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(signUpRequest(values));
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
          <div className="isoSignUpForm">
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
          </div>
        </div>
      </div>
    </SignUpStyleWrapper>
  );
}

const WrappedFormWIthSignUp = Form.create()(SignUp);
export default WrappedFormWIthSignUp;
