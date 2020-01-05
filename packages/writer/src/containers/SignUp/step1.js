import React from 'react';
import Button from '@iso/components/uielements/button';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import IntlMessages from '@iso/components/utility/intlMessages';
import Form from '@iso/components/uielements/form';
import { PASSWORD_REGX } from '../../config/Constants';
const FormItem = Form.Item;

function Step1({ ...props }) {
  const { getFieldDecorator, getFieldsError } = props.form;
  const [confirmDirty, setConfirmDirty] = React.useState(false);
  const handleConfirmBlur = e => {
    const value = e.target.value;
    setConfirmDirty(confirmDirty => confirmDirty || !!value);
  };
  const checkPassword = (rule, value, callback) => {
    if (value && !PASSWORD_REGX.regx.test(value)) {
      callback(PASSWORD_REGX.error);
    } else if (value && value !== props.form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent.');
    } else {
      callback();
    }
  };
  const checkConfirm = (rule, value, callback) => {
    if (value && !PASSWORD_REGX.regx.test(value)) {
      callback(PASSWORD_REGX.error);
    } else {
      if (value && confirmDirty) {
        props.form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
  };
  function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  return (
    <>
      <div className="boxSignUp">
        <div className="isoInputWrapper isoLeftRightComponent">
          <FormItem label="">
            {getFieldDecorator('firstName', {
              rules: [
                {
                  required: true,
                  message: 'Please enter first name.',
                },
              ],
            })(<Input placeholder="First name" className="customInput" />)}
          </FormItem>
          <FormItem label="">
            {getFieldDecorator('lastName', {
              rules: [
                {
                  required: true,
                  message: 'Please enter last name.',
                },
              ],
            })(<Input placeholder="Last name" className="customInput" />)}
          </FormItem>
        </div>
        <div className="isoInputWrapper isoLeftRightComponent">
          <FormItem label="">
            {getFieldDecorator('prefix', {
              rules: [
                {
                  required: true,
                  message: 'Please enter country code.',
                },
              ],
              initialValue: '+91',
            })(
              <Input
                placeholder="Country Code"
                className="customInput"
                maxLength={3}
              />
            )}
          </FormItem>{' '}
          <FormItem label="">
            {getFieldDecorator('phoneNumber', {
              rules: [
                {
                  required: true,
                  message: 'Please enter Phone number.',
                },
              ],
            })(
              <Input
                placeholder="Phone Number"
                className="customInput"
                maxLength={13}
                type="number"
              />
            )}
          </FormItem>
        </div>
        {/* this is for remove autofill email and password by browser */}
        <div className="hide">
          <Input tabIndex="-1" id="email" type="email" />
          <Input tabIndex="-1" type="password" />
        </div>
        {/* this is for remove autofill email and password by browser*/}
        <div className="isoInputWrapper">
          <FormItem label="" hasFeedback>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail.',
                },
                {
                  required: true,
                  message: 'Please input your E-mail.',
                },
              ],
            })(<Input placeholder="E-mail" className="customInput" />)}
          </FormItem>
        </div>
        <div className="isoInputWrapper">
          <FormItem label="" hasFeedback>
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
            })(
              <Input
                type="password"
                placeholder="Password"
                className="customInput"
              />
            )}
          </FormItem>
        </div>
        <div className="isoInputWrapper">
          <FormItem label="" hasFeedback>
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
            })(
              <Input
                type="password"
                placeholder="Confirm Password"
                onBlur={handleConfirmBlur}
                className="customInput"
              />
            )}
          </FormItem>
        </div>
        <div className="isoInputWrapper" style={{ marginBottom: '20px' }}>
          <FormItem>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
              rules: [
                {
                  message: 'Please accept terms and conditions',
                  required: true,
                },
              ],
            })(
              <Checkbox>
                <IntlMessages id="page.signUpTermsConditions" />
              </Checkbox>
            )}
          </FormItem>
        </div>
        <>
          <FormItem>
            <Button
              loading={props.loading}
              disabled={
                !(
                  props.form.getFieldsValue().agreement &&
                  !hasErrors(getFieldsError())
                )
              }
              type="primary"
              htmlType="submit"
            >
              <IntlMessages id="page.signUpButton" />
            </Button>
          </FormItem>
        </>
      </div>
    </>
  );
}
export default Step1;
