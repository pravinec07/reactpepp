import React, { Fragment } from 'react';
import { Form, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Step1 from './Step1';
import Step2 from './Step2';
import FormWrapper, { CardStyles } from './Signup.styles';
import action from './actions';

function Signup(props) {
  const dispatch = useDispatch();
  const isSignedUp = useSelector(state => state.Auth.idToken);
  const [current, setCurrent] = React.useState(1);
  const [confirmDirty, setConfirmDirty] = React.useState(false);
  const [radios, setRadios] = React.useState({ primaryIndustry: 0 });

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(action.fetchSignUpSaveStart(values));
      }
      setCurrent(current + 1);
    });
  }

  function handleConfirmBlur(e) {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  }

  function handleNextBackAction(val) {
    if (val > 0) {
      props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          setCurrent(current + val);
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
        setRadios({ ...radios, primaryIndustry: e.target.value });
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
            onSubmit={handleSubmit}
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
            {current === 3 && <div>Thankyou for sign up!!!</div>}
          </Form>
        </div>
      </Card>
    </FormWrapper>
  );
}

const SignupForm = Form.create({ name: 'signup' })(Signup);

export default SignupForm;
