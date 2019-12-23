import React, { Fragment } from 'react';
import { Form, Card } from 'antd';
import Step1 from './Step1';
import Step2 from './Step2';
import FormWrapper, { CardStyles } from './Signup.styles';

class Signup extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    current: 1,
    radios: { primaryIndustry: 0 },
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          current: this.state.current + 1,
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleback = e => {
    this.setState({
      current: this.state.current - 1,
    });
  };

  handleRadioChange = e => {
    e.preventDefault();
    switch (e.target.name) {
      case 'identification': {
        this.setState({
          radios: { ...this.state.radios, identification: e.target.value },
        });
        break;
      }
      case 'primaryIndustry': {
        this.setState({
          radios: { ...this.state.radios, primaryIndustry: e.target.value },
        });
        break;
      }
      case 'isLanguage': {
        this.setState({
          radios: { ...this.state.radios, isLanguage: e.target.value },
        });
        break;
      }
    }
  };

  render() {
    const { current } = this.state;
    return (
      <FormWrapper>
        <Card styles={{ CardStyles }}>
          <div className="isoSignupContentWrapper">
            <Form
              layout="vertical"
              onSubmit={this.handleSubmit}
              style={{ padding: '50px 100px' }}
            >
              {current === 1 && (
                <Step1
                  data={this.props}
                  radios={this.state.radios}
                  handleRadioChange={this.handleRadioChange}
                />
              )}
              {current === 2 && (
                <Step2
                  data={this.props}
                  handleback={this.handleback}
                  radios={this.state.radios}
                  handleRadioChange={this.handleRadioChange}
                  identityType={this.state.radios.identification}
                />
              )}
              {current === 3 && <div>Thankyou for sign up!!!</div>}
            </Form>
          </div>
        </Card>
      </FormWrapper>
    );
  }
}

const SignupForm = Form.create({ name: 'signup' })(Signup);

export default SignupForm;
