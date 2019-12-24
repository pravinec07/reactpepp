import React from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import Button from '@iso/components/uielements/button';
import Form from '@iso/components/uielements/form';
import IntlMessages from '@iso/components/utility/intlMessages';
import authAction from '../../redux/auth/actions';
import appAction from '@iso/redux/app/actions';
import SignInStyleWrapper from './SignIn.styles';

const { login } = authAction;
const { clearMenu } = appAction;

export default function SignIn() {
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  const [userName, setUserName] = React.useState('sami.frnd@gmail.com');
  const [password, setPassword] = React.useState('Ajaysoni@1234');
  const [remeberMe, setRemeberMe] = React.useState(false);

  const isLoggedIn = useSelector(state => state.Auth.idToken);

  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
  React.useEffect(() => {
    if (isLoggedIn) {
      setRedirectToReferrer(true);
    }
  }, [isLoggedIn]);

  function handleLogin(e, token = false) {
    e.preventDefault();
    if (userName && password) {
      dispatch(login({ username: userName, password }));

      // dispatch(clearMenu());
      // history.push("/dashboard");
    }
  }

  let { from } = location.state || { from: { pathname: '/dashboard' } };

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
                <Input
                  size="large"
                  placeholder="Username"
                  autoComplete="true"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                />
              </div>
              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Password"
                  autoComplete="false"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox
                  checked={remeberMe}
                  onClick={() => setRemeberMe(!remeberMe)}
                >
                  <IntlMessages id="page.writer.signInRememberMe" />
                </Checkbox>
                <Button type="primary" htmlType="submit">
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
