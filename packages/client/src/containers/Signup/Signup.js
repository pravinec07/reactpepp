import React, { Fragment } from 'react';
import { Form, Card } from 'antd';
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
  const [current, setCurrent] = React.useState(1);
  const [confirmDirty, setConfirmDirty] = React.useState(false);
  const [radios, setRadios] = React.useState({ primaryIndustry: 0 });

  function handleConfirmBlur(e) {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  }

  function handleNextBackAction(val, isSubmit) {
    if (val > 0) {
      props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          setCurrent(current + val);
          if (isSubmit) {
            dispatch(action.fetchSignUpSaveStart(JSON.stringify(values)));
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

  return (
    <FormWrapper>
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
