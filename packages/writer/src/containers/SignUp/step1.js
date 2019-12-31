import React from 'react';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import IntlMessages from '@iso/components/utility/intlMessages';
import Form from '@iso/components/uielements/form';
import Select, { SelectOption } from '@iso/components/uielements/select';

const FormItem = Form.Item;

function Step1({ form, dev }) {
  const { getFieldDecorator } = form;
  const [confirmDirty, setConfirmDirty] = React.useState(false);
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
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '+91',
  })(
    <Select style={{ width: 70 }}>
      <SelectOption value="+91">+91</SelectOption>
    </Select>
  );

  return (
    <>
      <div className="isoInputWrapper isoLeftRightComponent">
        <FormItem label="First Name">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please enter first name.',
              },
            ],
            initialValue: dev ? 'Pravin' : '',
          })(<Input placeholder="First name" />)}
        </FormItem>
        <FormItem label="Last Name">
          {getFieldDecorator('lastName', {
            rules: [
              {
                required: true,
                message: 'Please enter last name.',
              },
            ],
            initialValue: dev ? 'kumar' : '',
          })(<Input placeholder="Last name" />)}
        </FormItem>
      </div>
      <div className="isoInputWrapper">
        <FormItem label="Phone">
          {getFieldDecorator('phoneNumber', {
            rules: [
              {
                required: true,
                message: 'Please enter Phone number.',
              },
            ],
            initialValue: dev ? '9012345678' : '',
          })(
            <Input
              addonBefore={prefixSelector}
              placeholder="Phone number"
              maxLength={10}
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
        <FormItem label="Email" hasFeedback>
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
            initialValue: dev ? 'abc@abc.com' : '',
          })(<Input placeholder="E-mail" />)}
        </FormItem>
      </div>
      <div className="isoInputWrapper">
        <FormItem label="Password" hasFeedback>
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
            initialValue: dev ? 'Pravin@123' : '',
          })(<Input type="password" placeholder="Password" />)}
        </FormItem>
      </div>
      <div className="isoInputWrapper">
        <FormItem label="Confirm Password" hasFeedback>
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
            initialValue: dev ? 'Pravin@123' : '',
          })(
            <Input
              type="password"
              placeholder="Confirm Password"
              onBlur={handleConfirmBlur}
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
            initialValue: dev ? true : false,
          })(
            <Checkbox>
              <IntlMessages id="page.signUpTermsConditions" />
            </Checkbox>
          )}
        </FormItem>
      </div>
    </>
  );
}
export default Step1;
