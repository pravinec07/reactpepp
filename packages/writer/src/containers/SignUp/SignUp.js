import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import Button from '@iso/components/uielements/button';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Upload from '@iso/components/uielements/upload';
import message from '@iso/components/uielements/message';
import Icon from '@iso/components/uielements/icon';
import Form from '@iso/components/uielements/form';
import authAction from '@iso/redux/auth/actions';
import appActions from '@iso/redux/app/actions';
import IntlMessages from '@iso/components/utility/intlMessages';
import SignUpStyleWrapper from './SignUp.styles';
import {
  GENRE,
  VERTICAL,
  LANGUAGE,
  PAY_RANGE,
  POSITION_SOURCE,
} from '../../config/Constants';
import TextArea from 'antd/lib/input/TextArea';

const { Dragger } = Upload;
const { login } = authAction;
const { clearMenu } = appActions;
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

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}
function SignUp(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [confirmDirty, setConfirmDirty] = React.useState(false);
  const [formStep, setFormStep] = React.useState(1);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Notification(
          'success',
          'Received values of form',
          JSON.stringify(values)
        );
      }
    });
  };
  const handleConfirmBlur = e => {
    const value = e.target.value;
    setConfirmDirty(confirmDirty => confirmDirty || !!value);
  };
  const checkPassword = (rule, value, callback) => {
    const form = props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent.');
    } else {
      callback();
    }
  };
  const checkConfirm = (rule, value, callback) => {
    const form = props.form;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const { getFieldDecorator } = props.form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 24,
        offset: 0,
      },
    },
  };
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '86',
  })(
    <Select style={{ width: 70 }}>
      <SelectOption value="86">+86</SelectOption>
      <SelectOption value="87">+87</SelectOption>
    </Select>
  );
  const actionBution = step => {
    switch (step) {
      case 1: {
        return (
          <>
            <FormItem {...tailFormItemLayout}></FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button
                onClick={() => setFormStep(formStep + 1)}
                type="primary"
                htmlType="button"
              >
                Next
              </Button>
            </FormItem>
          </>
        );
      }
      case 5: {
        return (
          <>
            <FormItem {...tailFormItemLayout}>
              <Button
                onClick={() => setFormStep(formStep - 1)}
                type="primary"
                htmlType="button"
              >
                Back
              </Button>
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                <IntlMessages id="page.signUpButton" />
              </Button>
            </FormItem>
          </>
        );
      }
      default: {
        return (
          <>
            <FormItem {...tailFormItemLayout}>
              <Button
                onClick={() => setFormStep(formStep - 1)}
                type="primary"
                htmlType="button"
              >
                Back
              </Button>
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button
                onClick={() => setFormStep(formStep + 1)}
                type="primary"
                htmlType="button"
              >
                Next
              </Button>
            </FormItem>
          </>
        );
      }
    }
  };
  const handleLogin = (token = false) => {
    console.log(token, 'handlelogin');
    if (token) {
      dispatch(login(token));
    } else {
      dispatch(login());
    }
    dispatch(clearMenu());
    history.push('/dashboard');
  };
  return (
    <SignUpStyleWrapper className="isoSignUpPage">
      <div className="isoSignUpContentWrapper">
        <div className="isoSignUpContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.signUpTitle" />
            </Link>
          </div>
          <div className="isoSignUpForm">
            <Form layout="vertical" onSubmit={handleSubmit}>
              {formStep === 1 && (
                <>
                  <div className="isoInputWrapper">
                    <FormItem>
                      {getFieldDecorator('fname', {
                        rules: [
                          {
                            required: true,
                            message: 'Please enter first name.',
                          },
                        ],
                      })(<Input size="large" placeholder="First name" />)}
                    </FormItem>
                  </div>
                  <div className="isoInputWrapper">
                    <FormItem>
                      {getFieldDecorator('fname', {
                        rules: [
                          {
                            required: true,
                            message: 'Please enter last name.',
                          },
                        ],
                      })(<Input size="large" placeholder="Last name" />)}
                    </FormItem>
                  </div>
                  <div className="isoInputWrapper">
                    <FormItem>
                      {getFieldDecorator('phone', {
                        rules: [
                          {
                            required: true,
                            message: 'Please enter Phone number.',
                          },
                        ],
                      })(
                        <Input
                          size="large"
                          addonBefore={prefixSelector}
                          placeholder="Phone"
                        />
                      )}
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
                      })(
                        <Input name="email" placeholder="E-mail" id="email" />
                      )}
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
                      })(
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          onBlur={handleConfirmBlur}
                        />
                      )}
                    </FormItem>
                  </div>
                </>
              )}
              {formStep === 2 && (
                <>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="Please upload your CV"
                      help="Uploading your CV/Resume adds a lot of credibility to your
                      application and helps us evaluate better. Please upload
                      only PDF files."
                    >
                      <Dragger {...draggerProps}>
                        <p className="ant-upload-drag-icon">
                          <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag file to this area to upload
                        </p>
                      </Dragger>
                    </FormItem>
                  </div>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="Please select your Most Prefered Genre"
                      help="We will be allotting you work projects based on your preferred genre only. In case you have no specialization, please fill the 'Generic' option. Your samples will be evaluated based on your prefered Genre."
                    >
                      {getFieldDecorator('Genre', {
                        rules: [
                          {
                            required: true,
                            message: 'Please select your Most Prefered Genre.',
                          },
                        ],
                      })(
                        <Select
                          showSearch
                          placeholder="Select a Genre"
                          optionFilterProp="children"
                          onChange={onChange}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {GENRE.map((item, index) => (
                            <SelectOption
                              key={`genreone${index}`}
                              value={item.value}
                            >
                              {item.label}
                            </SelectOption>
                          ))}
                        </Select>
                      )}
                    </FormItem>
                  </div>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="Please select your second Most Prefered Genre"
                      help="We will be allotting you work projects based on your preferred genre only. In case you have no specialization, please fill the 'Generic' option. Your samples will be evaluated based on your prefered Genre."
                    >
                      <Select
                        showSearch
                        placeholder="Select a Genre"
                        optionFilterProp="children"
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {GENRE.map((item, index) => (
                          <SelectOption
                            key={`genreone${index}`}
                            value={item.value}
                          >
                            {item.label}
                          </SelectOption>
                        ))}
                      </Select>
                    </FormItem>
                  </div>
                </>
              )}
              {formStep === 3 && (
                <>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="Please select your Most Preferred Vertical"
                      help="We will be allotting you work projects based on your preferred vertical only. Also, the samples that you will be attaching in the form below, will be evaluated based on your preference given in the vertical."
                    >
                      <Select
                        showSearch
                        placeholder="Select a Vertical"
                        optionFilterProp="children"
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {VERTICAL.map((item, index) => (
                          <SelectOption
                            key={`genreone${index}`}
                            value={item.value}
                          >
                            {item.label}
                          </SelectOption>
                        ))}
                      </Select>
                    </FormItem>
                  </div>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="Please select your second Most Preferred Vertical"
                      help="We will be allotting you work projects based on your preferred vertical only. Also, the samples that you will be attaching in the form below, will be evaluated based on your preference given in the vertical."
                    >
                      <Select
                        showSearch
                        placeholder="Select a Vertical"
                        optionFilterProp="children"
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {VERTICAL.map((item, index) => (
                          <SelectOption
                            key={`genreone${index}`}
                            value={item.value}
                          >
                            {item.label}
                          </SelectOption>
                        ))}
                      </Select>
                    </FormItem>
                  </div>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="What languages are you proficient in?"
                      help="Please update the samples based on your proficiency in the different languages."
                    >
                      <Checkbox.Group
                        options={LANGUAGE}
                        defaultValue={['Pear']}
                        onChange={onChange}
                      />
                    </FormItem>
                  </div>
                </>
              )}
              {formStep === 4 && (
                <>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="Please upload Samples (Preferably in the categories that you have selected.)"
                      help="The more, the merrier. We will only be able to assign you assignments in verticals and genre that you can prove you have previous experience in. And these samples help us pinpoint these verticals and categories!"
                    >
                      <Dragger {...draggerProps}>
                        <p className="ant-upload-drag-icon">
                          <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag file to this area to upload
                        </p>
                      </Dragger>
                    </FormItem>
                  </div>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="Please let us know your Expected Pay? (In Rupees per word)"
                      help="Please quote a minimum working price for your content services. We will keep this in mind while we evaluate and negotiate."
                    >
                      <Select
                        showSearch
                        placeholder="Select Rupees per word"
                        optionFilterProp="children"
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {PAY_RANGE.map((item, index) => (
                          <SelectOption
                            key={`genreone${index}`}
                            value={item.value}
                          >
                            {item.label}
                          </SelectOption>
                        ))}
                      </Select>
                    </FormItem>
                  </div>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="Please tell us a bit about your previous writing experiences and skillsets."
                      help="Please tell us more about the types of content projects that you've worked on before."
                    >
                      <TextArea />
                    </FormItem>
                  </div>
                </>
              )}
              {formStep === 5 && (
                <>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="Please list down the companies that you've worked for in the past."
                      help="It is not absolutely necessary but helps us decide better. It will also affect the pay scale that we offer you."
                    >
                      <TextArea />
                    </FormItem>
                  </div>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="How did you hear about this position?"
                      help="Please quote a minimum working price for your content services. We will keep this in mind while we evaluate and negotiate."
                    >
                      <Select
                        showSearch
                        placeholder="Select a Source"
                        optionFilterProp="children"
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {POSITION_SOURCE.map((item, index) => (
                          <SelectOption
                            key={`genreone${index}`}
                            value={item.value}
                          >
                            {item.label}
                          </SelectOption>
                        ))}
                      </Select>
                    </FormItem>
                  </div>
                  <div className="isoInputWrapper">
                    <FormItem label="What profession are you in, apart from freelance writing?">
                      <TextArea />
                    </FormItem>
                  </div>
                  <div
                    className="isoInputWrapper"
                    style={{ marginBottom: '50px' }}
                  >
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
                </>
              )}
              <div className="isoInputWrapper isoLeftRightComponent">
                {actionBution(formStep)}
              </div>
              <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                <Link to="/signin">
                  <IntlMessages id="page.signUpAlreadyAccount" />
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </SignUpStyleWrapper>
  );
}

const WrappedFormWIthSignUp = Form.create()(SignUp);
export default WrappedFormWIthSignUp;
