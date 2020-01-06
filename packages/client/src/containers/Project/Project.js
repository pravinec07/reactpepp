import React, { Fragment } from 'react';
import { Form, Steps } from 'antd';
import { connect } from 'react-redux';
import AddArticlesForm from './AddArticlesForm';
import CreateProjectForm from './CreateProjectForm';
import actions from './actions';
import Notification from '@iso/components/Notification';

const { projectSaveStart, articleSaveStart } = actions;
class ProjectForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    current: 2,
    articles: [],
  };

  componentWillReceiveProps(nextProps) {
    console.log('nextprops--->', nextProps);
    if (nextProps.project.projectId) {
      this.setState({ current: 2 });
    }
    if (nextProps.project.articleSuccessful) {
      Notification('success', 'Articles save Successfully', true);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      form,
      user,
      project,
      projectSaveStart,
      articleSaveStart,
    } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values, user);
        if (this.state.current === 1) {
          projectSaveStart(values, user.username);
        } else {
          articleSaveStart(this.state.articles, project.projectId);
        }
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleAddArticle = () => {
    if (this.state.current === 2) {
      const { articles } = this.state;
      this.props.form.validateFieldsAndScroll((err, values) => {
        articles.push(values);
        this.setState({
          articles: articles,
        });
      });
    }
  };

  handleDeleteArticle = (key, record) => {
    console.log('---->', key, record);
    const { articles } = this.state;
    const index = articles.findIndex(
      art => art.articleTopic === record.articleTopic
    );
    articles.splice(index, 1);
    this.setState({
      articles: articles,
    });
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
            <AddArticlesForm
              data={this.props}
              articlesData={articles}
              handleAddArticle={this.handleAddArticle}
              handleDeleteArticle={this.handleDeleteArticle}
            />
          )}
        </Form>
      </Fragment>
    );
  }
}

const WrappedProjectForm = Form.create({ name: 'project' })(ProjectForm);

function mapStateToProps(state) {
  console.log('in project', state);
  return {
    project: state.projectReducer,
    user: JSON.parse(
      Buffer.from(state.Auth.idToken, 'base64').toString('ascii')
    ).userData,
  };
}

export default connect(
  mapStateToProps,
  {
    projectSaveStart,
    articleSaveStart,
  }
)(WrappedProjectForm);
