import React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import Icon from '@iso/components/uielements/icon';
import Button from '@iso/components/uielements/button';
import Form from '@iso/components/uielements/form';
import Notification from '@iso/components/Notification';
import IntlMessages from '@iso/components/utility/intlMessages';
import appAction from '@iso/redux/app/actions';
import SignInStyleWrapper from './SignIn.styles';
import authAction from './actions';

const { login } = authAction;

const { clearMenu } = appAction;
const FormItem = Form.Item;
function SignIn(props) {
  const dev = true;
  // let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const isLoggedIn = useSelector(state => state.Auth.idToken);
  const response = useSelector(state => state.Auth);

  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
  React.useEffect(() => {
    if (isLoggedIn) {
      setRedirectToReferrer(true);
    }
  }, [isLoggedIn]);
  React.useEffect(() => {
    if (response.loginLoading !== null) {
      if (!response.loginLoading && !response.loginError) {
      } else if (response.loginError) {
        Notification('error', 'Error', response.loginError);
      }
      console.log('Login api called changed 1111', response.loginLoading);
    }
  }, [response.loginLoading, response.loginError]);

  function handleLogin(e) {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('handling login');
        dispatch(login(values));
        dispatch(clearMenu());
      }
    });
  }
  const prefixSelector = showPassword ? (
    <Icon onClick={() => setShowPassword(!showPassword)} type="eye-invisible" />
  ) : (
    <Icon onClick={() => setShowPassword(!showPassword)} type="eye" />
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
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.writer.signInTitle" />
            </Link>
          </div>
          <div className="isoSignInForm">
            <Form onSubmit={handleLogin}>
              <div className="isoInputWrapper">
                <FormItem>
                  {getFieldDecorator('username', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter Email.',
                      },
                    ],
                    // initialValue: dev ? "pravin@gmail.com" : ""
                  })(<Input placeholder="Email" size="large" />)}
                </FormItem>
              </div>
              <div className="isoInputWrapper">
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter password.',
                      },
                    ],
                    type: 'password',
                  })(
                    <Input
                      addonAfter={prefixSelector}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      size="large"
                    />
                  )}
                </FormItem>
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
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
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                  <IntlMessages id="page.writer.signInButton" />
                </Button>
              </div>
            </Form>
            <div className="isoCenterComponent isoHelperWrapper">
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
