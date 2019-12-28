import React from 'react';
import Input from '@iso/components/uielements/input';
import Upload from '@iso/components/uielements/upload';
import message from '@iso/components/uielements/message';
import Icon from '@iso/components/uielements/icon';
import Form from '@iso/components/uielements/form';
import Select, { SelectOption } from '@iso/components/uielements/select';

const { Dragger } = Upload;
const FormItem = Form.Item;

const draggerProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

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
      <div className="isoInputWrapper">
        <FormItem>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please enter first name.',
              },
            ],
            initialValue: dev ? 'Pravin' : '',
          })(<Input size="large" placeholder="First name" />)}
        </FormItem>
      </div>
      <div className="isoInputWrapper">
        <FormItem>
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
        <FormItem>
          {getFieldDecorator('phoneNumber', {
            rules: [
              {
                required: true,
                message: 'Please enter Phone number.',
              },
            ],
            initialValue: dev ? '9012345678' : '',
          })(<Input addonBefore={prefixSelector} placeholder="Phone number" />)}
        </FormItem>
      </div>
      <div className="isoInputWrapper">
        <FormItem hasFeedback>
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
          })(<Input name="email" placeholder="E-mail" id="email" />)}
        </FormItem>
      </div>
      <div className="isoInputWrapper">
        <FormItem hasFeedback>
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
        <FormItem hasFeedback>
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
      <div className="isoInputWrapper">
        <FormItem
          label="Please upload your CV"
          help="Uploading your CV/Resume adds a lot of credibility to your
    application and helps us evaluate better. Please upload
    only PDF files."
        >
          <Dragger {...draggerProps}>
            <p>
              <Icon type="cloud-upload" />
              <span>Drag & drop (or) choose file</span>
            </p>
          </Dragger>
        </FormItem>
      </div>
    </>
  );
}
export default Step1;
