import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'antd';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import { useDispatch, useSelector } from 'react-redux';
import Form from '@iso/components/uielements/form';
import IntlMessages from '@iso/components/utility/intlMessages';
import Notification from '@iso/components/Notification';
import userActions from '../../redux/user/actions';

const { changePasswordStart } = userActions;
const FormItem = Form.Item;

function ManagePassword(props) {
  const dev = true;
  const dispatch = useDispatch();
  const [confirmDirty, setConfirmDirty] = React.useState(false);
  const [confirmationCode, setConfirmationCode] = React.useState(false);
  const Auth = useSelector(state => state.Auth);
  const { changePasswordLoading, changePasswordError } = useSelector(
    state => state.User
  );
  // console.log(Auth.idToken, "user vale");
  const { form } = props;
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(
          changePasswordStart({
            ...values,
            username: Auth.idToken.userData.email,
            accessToken: Auth.idToken.accessToken,
          })
        );
      }
    });
  };

  React.useEffect(() => {
    if (changePasswordLoading !== null) {
      if (!changePasswordLoading && !changePasswordError) {
        if (confirmationCode) {
          Notification(
            'success',
            'Success',
            'Password has successfully changed.'
          );
          props.form.resetFields();
        } else {
          Notification(
            'success',
            'Success',
            'Please check your email inbox for confirmation code.'
          );
        }
        setConfirmationCode(!confirmationCode);
      } else if (changePasswordError) {
        Notification('error', 'Error', changePasswordError);
      }
      console.log('Login api called changed', changePasswordLoading);
    }
  }, [changePasswordLoading, changePasswordError]);
  const handleConfirmBlur = e => {
    const value = e.target.value;
    setConfirmDirty(confirmDirty => confirmDirty || !!value);
  };
  const checkPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent.');
    } else {
      callback();
    }
  };
  const checkConfirm = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  const reset = () => {
    props.form.resetFields();
    setConfirmationCode(!confirmationCode);
  };
  return (
    <>
      <Row>
        <Col span={7}></Col>
        <Col span={10}>
          <h2 style={{ margin: '10px 0px', textAlign: 'center' }}>
            Manage Privacy
          </h2>
          <Card
            type="inner"
            title="Change Password"
            style={{ margin: '20px 0px' }}
          >
            <Form layout="vertical" onSubmit={handleSubmit}>
              {/* <div className="isoInputWrapper">
                <FormItem label="">
                  {getFieldDecorator('username', {
                    initialValue: dev
                      ? Auth.idToken.userData && Auth.idToken.userData.email
                      : '',
                  })(<Input disabled />)}
                </FormItem>
              </div> */}
              {/* hide auto fill password by browser */}
              <div className="hide">
                <Input type="password" />
              </div>
              <div className="isoInputWrapper">
                <p
                  style={{
                    color: '#16224F',
                    fontWeight: '600',
                    marginBottom: '10px',
                  }}
                >
                  <span style={{ color: 'red' }}>* </span>Old Password
                </p>
                <FormItem label="">
                  {getFieldDecorator('oldPassword', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter your old password.',
                      },
                    ],
                    initialValue: '',
                  })(
                    <Input
                      type="password"
                      showHide={true}
                      placeholder="Old Password"
                      size="large"
                    />
                  )}
                </FormItem>
              </div>
              <div className="isoInputWrapper">
                <p
                  style={{
                    color: '#16224F',
                    fontWeight: '600',
                    marginBottom: '10px',
                  }}
                >
                  <span style={{ color: 'red' }}>* </span>New Password
                </p>
                <FormItem label="">
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password.',
                      },
                      {
                        validator: checkConfirm,
                      },
                    ],
                    initialValue: '',
                  })(
                    <Input
                      type="password"
                      showHide={true}
                      placeholder="New Password"
                      size="large"
                    />
                  )}
                </FormItem>
              </div>
              <div className="isoInputWrapper">
                <p
                  style={{
                    color: '#16224F',
                    fontWeight: '600',
                    marginBottom: '10px',
                  }}
                >
                  <span style={{ color: 'red' }}>* </span>Confirm Password
                </p>
                <FormItem label="">
                  {getFieldDecorator('confirm', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your password.',
                      },
                      {
                        validator: checkPassword,
                      },
                    ],
                    initialValue: '',
                  })(
                    <Input
                      type="password"
                      showHide={true}
                      placeholder="Confirm Password"
                      size="large"
                      onBlur={handleConfirmBlur}
                    />
                  )}
                </FormItem>
              </div>
              {confirmationCode && (
                <div className="isoInputWrapper">
                  <FormItem label="Confirmation Code">
                    {getFieldDecorator('confirmationCode', {
                      rules: [
                        {
                          required: true,
                          message:
                            'Please enter your confirmation code from your email.',
                        },
                      ],
                      initialValue: '',
                    })(<Input placeholder="Confirmation Code" />)}
                  </FormItem>
                </div>
              )}
              <Row gutter={24}>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Form.Item>
                    {confirmationCode ? (
                      <Button onClick={reset} type="primary" htmlType="Button">
                        Reset Form
                      </Button>
                    ) : (
                      <Button type="primary" htmlType="submit">
                        Send Confirmation Code
                      </Button>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12} style={{ textAlign: 'left' }}>
                  <Form.Item>
                    <Button
                      disabled={!confirmationCode}
                      type="danger"
                      htmlType="submit"
                      loading={changePasswordLoading}
                    >
                      Change Password
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

const WrappedFormWIthManagePassword = Form.create()(ManagePassword);
export default WrappedFormWIthManagePassword;
