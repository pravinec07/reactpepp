import React, { Fragment } from 'react';
import { Form, Steps } from 'antd';
import AddArticlesForm from './AddArticlesForm';
import CreateProjectForm from './CreateProjectForm';

class ProjectForm extends React.Component {
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
          current: 2,
        });
        if (this.state.current === 2) {
          const { articles } = this.state;
          articles.push(values);
          this.setState({
            articles: articles,
          });
        }
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { Step } = Steps;
    const { current, articles } = this.state;
    return (
      <Fragment>
        <Steps
          size="small"
          current={current}
          style={{ padding: '50px 300px 0 300px' }}
        >
          <Step title="Create Project" />
          <Step title="Add Articles" />
        </Steps>
        <Form
          layout="vertical"
          onSubmit={this.handleSubmit}
          style={{ padding: '50px 100px' }}
        >
          {current === 1 && <CreateProjectForm data={this.props} />}
          {current === 2 && (
            <AddArticlesForm data={this.props} articlesData={articles} />
          )}
        </Form>
      </Fragment>
    );
  }
}

const WrappedProjectForm = Form.create({ name: 'project' })(ProjectForm);

export default WrappedProjectForm;
