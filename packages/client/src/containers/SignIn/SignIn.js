import React from 'react';
import { Form, Row, Col } from 'antd';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import Icon from '@iso/components/uielements/icon';
import Button from '@iso/components/uielements/button';
// import Form from '@iso/components/uielements/form';
import Notification from '@iso/components/Notification';
import IntlMessages from '@iso/components/utility/intlMessages';
import appAction from '@iso/redux/app/actions';
import SignInStyleWrapper from './SignIn.styles';
import authAction from '../../redux/auth/actions';

const { login } = authAction;
const { clearMenu } = appAction;
const FormItem = Form.Item;
function SignIn(props) {
  const dev = false;
  // let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const isLoggedIn = useSelector(state => state.Auth.idToken);
  const { loginLoading, loginError } = useSelector(state => state.Auth);

  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
  React.useEffect(() => {
    if (isLoggedIn) {
      setRedirectToReferrer(true);
    }
  }, [isLoggedIn]);
  React.useEffect(() => {
    if (loginLoading !== null) {
      if (!loginLoading && !loginError) {
      } else if (loginError) {
        Notification('error', 'Error', loginError);
      }
      console.log('Login api called changed', loginLoading);
    }
  }, [loginLoading, loginError]);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(login(values));
        dispatch(clearMenu());
      }
    });
  };
  const prefixSelector = showPassword ? (
    <Icon onClick={() => setShowPassword(!showPassword)} type="eye" />
  ) : (
    <Icon onClick={() => setShowPassword(!showPassword)} type="eye-invisible" />
  );
  let { from } = location.state || { from: { pathname: '/dashboard' } };
  const { getFieldDecorator, getFieldsError } = props.form;
  function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }
  return (
    <SignInStyleWrapper className="isoSignUpPage">
      <div className="isoSignUpContentWrapper">
        <div className="isoSignUpContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.signInTitle" />
            </Link>
          </div>
          <div className="isoSignUpForm">
            <div className="isoInputWrapper">
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter user name/email.',
                    },
                  ],
                  initialValue: dev ? 'pravin@gmail.com' : '',
                })(<Input placeholder="Username" className="customInput" />)}
              </FormItem>
            </div>
            <div className="isoInputWrapper" style={{ marginTop: '15px' }}>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter password.',
                    },
                  ],
                  initialValue: dev ? 'Pravin@123' : '',
                })(
                  <Input
                    // addonAfter={prefixSelector}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="customInput"
                  />
                )}
              </FormItem>
            </div>
            <div className="isoInputWrapper">
              <FormItem>
                {getFieldDecorator('remeberMe', {
                  valuePropName: 'checked',
                  rules: [
                    {
                      required: true,
                      message: 'Please enter user name/email.',
                    },
                  ],
                  initialValue: dev ? true : false,
                })(
                  <Checkbox>
                    <IntlMessages id="page.writer.signInRememberMe" />
                  </Checkbox>
                )}
              </FormItem>
            </div>
            <div className="isoInputWrapper">
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                loading={loginLoading}
              >
                <IntlMessages id="page.writer.signInButton" />
              </Button>
            </div>
            <div
              className="isoCenterComponent isoHelperWrapper"
              style={{ marginTop: '10px' }}
            >
              <Link to="/forgotpassword" className="isoForgotPass">
                <IntlMessages id="page.signInForgotPass" />
              </Link>
              <Link to="/signup">
                <IntlMessages id="page.writer.signInCreateAccount" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
const WrappedFormWIthSignIn = Form.create()(SignIn);
export default WrappedFormWIthSignIn;
