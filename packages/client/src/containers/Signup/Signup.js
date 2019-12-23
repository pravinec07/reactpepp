import React, { Fragment } from 'react';
import { Form } from 'antd';
import Step1 from './Step1';
import Step2 from './Step2';

class Signup extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    current: 1,
    articles: [],
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

  render() {
    const { current } = this.state;
    return (
      <Fragment>
        <Form layout="vertical" style={{ padding: '50px 100px' }}>
          {current === 1 && <Step1 data={this.props} />}
          {current === 2 && (
            <Step2 data={this.props} handleback={this.handleback} />
          )}
        </Form>
      </Fragment>
    );
  }
}

const SignupForm = Form.create({ name: 'signup' })(Signup);

export default SignupForm;
