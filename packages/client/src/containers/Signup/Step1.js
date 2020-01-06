import React from 'react';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import IntlMessages from '@iso/components/utility/intlMessages';
import Radio, { RadioGroup } from '@iso/components/uielements/radio';
import Form from '@iso/components/uielements/form';
import Select, { SelectOption } from '@iso/components/uielements/select';

const FormItem = Form.Item;

function Step1({ form, dev, handleRadioChange, identityType }) {
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
      <div className="boxSignUp">
        <div className="isoInputWrapper">
          <FormItem label="Please identify yourself">
            {getFieldDecorator('identifyType', {
              rules: [
                {
                  required: true,
                  message: 'Please select one identity',
                },
              ],
            })(
              <RadioGroup
                name="identification"
                onChange={handleRadioChange}
                value={identityType}
              >
                <Radio value={'business'}>Business</Radio>
                <Radio value={'agency'}>Agency</Radio>
                <Radio value={'individual'}>Individual</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </div>
        {identityType !== 'individual' && (
          <div className="isoInputWrapper">
            <FormItem label="">
              {getFieldDecorator('companyName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input name of Company',
                  },
                ],
              })(<Input placeholder="Company Name" className="customInput" />)}
            </FormItem>
          </div>
        )}
        <div className="isoInputWrapper isoLeftRightComponent">
          <FormItem label="">
            {getFieldDecorator('firstName', {
              rules: [
                {
                  required: true,
                  message: 'Please enter first name.',
                },
              ],
              initialValue: dev ? 'Pravin' : '',
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
              initialValue: dev ? 'kumar' : '',
            })(<Input placeholder="Last name" className="customInput" />)}
          </FormItem>
        </div>
        <div className="isoInputWrapper">
          <FormItem label="">
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
                // addonBefore={prefixSelector}
                placeholder="Phone number"
                className="customInput"
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
              initialValue: dev ? 'abc@abc.com' : '',
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
              initialValue: dev ? 'Pravin@123' : '',
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
              initialValue: dev ? 'Pravin@123' : '',
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
      </div>
    </>
  );
}
export default Step1;
