import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import Button from '@iso/components/uielements/button';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Upload from '@iso/components/uielements/upload';
import message from '@iso/components/uielements/message';
import Icon from '@iso/components/uielements/icon';
import Form from '@iso/components/uielements/form';
import IntlMessages from '@iso/components/utility/intlMessages';
import SignUpStyleWrapper from './SignUp.styles';
import TextArea from 'antd/lib/input/TextArea';
import Notification from '@iso/components/Notification';
import userActions from '../../redux/user/actions';

import {
  GENRE,
  VERTICAL,
  LANGUAGE,
  PAY_RANGE,
  POSITION_SOURCE,
} from '../../config/Constants';

const { Dragger } = Upload;
const { signUpRequest } = userActions;
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
let formValues = {};
function SignUp(props) {
  const dev = false;
  const [confirmDirty, setConfirmDirty] = React.useState(false);
  const [formStep, setFormStep] = React.useState(1);
  const dispatch = useDispatch();
  const response = useSelector(state => state.User);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        formValues = { ...formValues, ...values };
        if (formStep === 5) {
          dispatch(signUpRequest(formValues));
        } else {
          setFormStep(formStep + 1);
        }
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
    initialValue: '+91',
  })(
    <Select style={{ width: 70 }}>
      <SelectOption value="+91">+91</SelectOption>
    </Select>
  );
  const actionBution = step => {
    switch (step) {
      case 1: {
        return (
          <>
            <FormItem {...tailFormItemLayout}></FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
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
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </FormItem>
          </>
        );
      }
    }
  };
  useEffect(() => {
    if (response.signUpLoading !== null) {
      if (!response.signUpLoading && !response.signUpError) {
        setFormStep(formStep + 1);
      } else if (response.signUpError) {
        Notification('error', response.signUpError);
      }
      console.log('property changed', response.signUpLoading);
    }
  }, [response.signUpLoading]);
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
                      })(
                        <Input
                          addonBefore={prefixSelector}
                          placeholder="Phone number"
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
                        initialValue: dev ? 'abc@abc.com' : '',
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
              )}
              {formStep === 2 && (
                <>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="Please select your Most Prefered Genre"
                      help="We will be allotting you work projects based on your preferred genre only. In case you have no specialization, please fill the 'Generic' option. Your samples will be evaluated based on your prefered Genre."
                    >
                      {getFieldDecorator('genre1', {
                        valuePropName: 'value',
                        rules: [
                          {
                            required: true,
                            message: 'Please select your Most Prefered Genre.',
                          },
                        ],
                        initialValue: dev ? GENRE[0].value : '',
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
                      {getFieldDecorator('genre2', {
                        valuePropName: 'value',
                        initialValue: dev ? GENRE[0].value : '',
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
                  </div>{' '}
                  <div className="isoInputWrapper">
                    <FormItem
                      label="Please select your Most Preferred Vertical"
                      help="We will be allotting you work projects based on your preferred vertical only. Also, the samples that you will be attaching in the form below, will be evaluated based on your preference given in the vertical."
                    >
                      {getFieldDecorator('vertical1', {
                        valuePropName: 'value',
                        initialValue: dev ? VERTICAL[0].value : '',
                      })(
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
                      )}
                    </FormItem>
                  </div>
                </>
              )}
              {formStep === 3 && (
                <>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="Please select your second Most Preferred Vertical"
                      help="We will be allotting you work projects based on your preferred vertical only. Also, the samples that you will be attaching in the form below, will be evaluated based on your preference given in the vertical."
                    >
                      {getFieldDecorator('vertical2', {
                        valuePropName: 'value',
                        initialValue: dev ? VERTICAL[0].value : '',
                      })(
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
                      )}
                    </FormItem>
                  </div>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="What languages are you proficient in?"
                      help="Please update the samples based on your proficiency in the different languages."
                    >
                      {getFieldDecorator('languages', {
                        valuePropName: 'value',
                        initialValue: dev ? [LANGUAGE[0].value] : [],
                      })(
                        <Checkbox.Group
                          options={LANGUAGE}
                          onChange={onChange}
                        />
                      )}
                    </FormItem>
                  </div>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="Please upload Samples (Preferably in the categories that you have selected.)"
                      help="The more, the merrier. We will only be able to assign you assignments in verticals and genre that you can prove you have previous experience in. And these samples help us pinpoint these verticals and categories!"
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
              )}
              {formStep === 4 && (
                <>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="Please let us know your Expected Pay? (In Rupees per word)"
                      help="Please quote a minimum working price for your content services. We will keep this in mind while we evaluate and negotiate."
                    >
                      {getFieldDecorator('expectedPay', {
                        valuePropName: 'value',
                        initialValue: dev ? PAY_RANGE[0].value : '',
                      })(
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
                      )}
                    </FormItem>
                  </div>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="Please tell us a bit about your previous writing experiences and skillsets."
                      help="Please tell us more about the types of content projects that you've worked on before."
                    >
                      {getFieldDecorator('writingSkillSet', {
                        valuePropName: 'value',
                      })(<TextArea />)}
                    </FormItem>
                  </div>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="Please list down the companies that you've worked for in the past."
                      help="It is not absolutely necessary but helps us decide better. It will also affect the pay scale that we offer you."
                    >
                      {getFieldDecorator('pastCompanies', {
                        valuePropName: 'value',
                      })(<TextArea />)}
                    </FormItem>
                  </div>
                </>
              )}
              {formStep === 5 && (
                <>
                  <div className="isoInputWrapper">
                    <FormItem
                      label="How did you hear about this position?"
                      help="Please quote a minimum working price for your content services. We will keep this in mind while we evaluate and negotiate."
                    >
                      {getFieldDecorator('socialMedia', {
                        valuePropName: 'value',
                        initialValue: dev ? POSITION_SOURCE[0].value : '',
                      })(
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
                      )}
                    </FormItem>
                  </div>
                  <div className="isoInputWrapper">
                    <FormItem label="What profession are you in, apart from freelance writing?">
                      {getFieldDecorator('currentProfession', {
                        valuePropName: 'value',
                      })(<TextArea />)}
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
                        initialValue: dev ? true : false,
                      })(
                        <Checkbox>
                          <IntlMessages id="page.signUpTermsConditions" />
                        </Checkbox>
                      )}
                    </FormItem>
                  </div>
                </>
              )}
              {formStep === 6 ? (
                <div>
                  <h1>Thank You!!!</h1>
                  <p>Your account has been created successfully.</p>
                  <p>You can login by email and password.</p>
                </div>
              ) : (
                <div className="isoInputWrapper isoLeftRightComponent">
                  {actionBution(formStep)}
                </div>
              )}
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
