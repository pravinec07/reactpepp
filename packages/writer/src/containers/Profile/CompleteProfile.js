import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Row, Col, Card } from 'antd';
import Upload from '@iso/components/uielements/upload';
import Button from '@iso/components/uielements/button';
import Checkbox from '@iso/components/uielements/checkbox';
import Form from '@iso/components/uielements/form';
import Select, { SelectOption } from '@iso/components/uielements/select';
import TextArea from 'antd/lib/input/TextArea';
import userActions from '../../redux/user/actions';
import Notification from '@iso/components/Notification';

import {
  GENRE,
  VERTICAL,
  PAY_RANGE,
  POSITION_SOURCE,
  LANGUAGE,
} from '../../config/Constants';
const { Dragger } = Upload;
const FormItem = Form.Item;
const { signUpRequest } = userActions;

function CompleteProfileDetails({ ...props }) {
  const dev = true;
  const { getFieldDecorator } = props.form;
  const dispatch = useDispatch();
  const response = useSelector(state => state.User);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(signUpRequest(values));
      }
    });
  };

  useEffect(() => {
    if (response.signUpLoading !== null) {
      if (!response.signUpLoading && !response.signUpError) {
      } else if (response.signUpError) {
        Notification('error', 'Error', response.signUpError);
      }
      console.log('property changed', response.signUpLoading);
    }
  }, [response.signUpLoading, response.signUpError]);
  return (
    <>
      <Row>
        <Col span={5}></Col>
        <Col span={14}>
          <h2 style={{ margin: '10px 0px', textAlign: 'center' }}>
            Basic Information & Experience
          </h2>
          <Card
            type="inner"
            title="Basic Information"
            style={{ margin: '20px 0px' }}
          >
            <Form layout="vertical" onSubmit={handleSubmit}>
              <Row gutter={24}>
                <Col span={24}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    Please upload your CV
                  </p>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label=""
                    help="Uploading your CV/Resume adds a lot of credibility to your application and helps us evaluate better. Please upload only PDF files."
                  >
                    {getFieldDecorator('dragger', {
                      valuePropName: 'fileList',
                      // getValueFromEvent: this.normFile,
                    })(
                      <Dragger name="files" action="/upload.do">
                        <p className="ant-upload-drag-icon">
                          <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                          Support for a single or bulk upload.
                        </p>
                      </Dragger>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    Select your Most Prefered Genre
                  </p>
                  <FormItem>
                    {getFieldDecorator('genre1', {
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
                </Col>
                <Col span={12}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    Select your second Most Prefered Genre
                  </p>
                  <FormItem>
                    {getFieldDecorator('genre2', {})(
                      <Select
                        showSearch
                        placeholder="Select a Genre"
                        optionFilterProp="children"
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
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    Select your Most Preferred Vertical
                  </p>
                  <FormItem>
                    {getFieldDecorator('vertical1', {})(
                      <Select
                        showSearch
                        placeholder="Select a Vertical"
                        optionFilterProp="children"
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
                </Col>
                <Col span={12}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    Select your Second Most Preferred Vertical
                  </p>
                  <FormItem>
                    {getFieldDecorator('vertical2', {})(
                      <Select
                        showSearch
                        placeholder="Select a Vertical"
                        optionFilterProp="children"
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
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    What languages are you proficient in?
                  </p>
                </Col>
                <Col span={24}>
                  <FormItem help="Please update the samples based on your proficiency in the different languages.">
                    {getFieldDecorator('languages', {
                      valuePropName: 'value',
                      initialValue: dev ? [LANGUAGE[0].value] : [],
                    })(<Checkbox.Group options={LANGUAGE} />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24} style={{ marginTop: '15px' }}></Col>
                <Col span={24}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    Please upload Samples (Preferably in the categories that you
                    have selected.)
                  </p>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label=""
                    help="The more, the merrier. We will only be able to assign you assignments in verticals and genre that you can prove you have previous experience in. And these samples help us pinpoint these verticals and categories!"
                  >
                    {getFieldDecorator('dragger', {
                      valuePropName: 'fileList',
                      // getValueFromEvent: this.normFile,
                    })(
                      <Dragger name="files" action="/upload.do">
                        <p className="ant-upload-drag-icon">
                          <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                          Support for a single or bulk upload.
                        </p>
                      </Dragger>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24} style={{ marginTop: '15px' }}></Col>
                <Col span={14}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    Please let us know your Expected Pay? (In Rupees per word)
                  </p>
                  <FormItem>
                    {getFieldDecorator('expectedPay', {
                      valuePropName: 'value',
                      initialValue: dev ? PAY_RANGE[0].value : '',
                    })(
                      <Select
                        showSearch
                        placeholder="Select Rupees per word"
                        optionFilterProp="children"
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
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24} style={{ marginTop: '15px' }}></Col>
                <Col span={24}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    Please tell us a bit about your previous writing experiences
                    and skillsets.
                  </p>
                </Col>
                <Col span={24}>
                  <FormItem help="Please tell us more about the types of content projects that you've worked on before.">
                    {getFieldDecorator('writingSkillSet', {
                      valuePropName: 'value',
                    })(<TextArea style={{ height: '80px' }} />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24} style={{ marginTop: '15px' }}></Col>
                <Col span={24}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    Please list down the companies that you've worked for in the
                    past.
                  </p>
                </Col>
                <Col span={24}>
                  <FormItem help="It is not absolutely necessary but helps us decide better. It will also affect the pay scale that we offer you.">
                    {getFieldDecorator('pastCompanies', {
                      valuePropName: 'value',
                    })(<TextArea style={{ height: '80px' }} />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24} style={{ marginTop: '15px' }}></Col>
                <Col span={14}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    How did you hear about this position?
                  </p>
                  <FormItem help="Please quote a minimum working price for your content services. We will keep this in mind while we evaluate and negotiate.">
                    {getFieldDecorator('socialMedia', {
                      valuePropName: 'value',
                      initialValue: dev ? POSITION_SOURCE[0].value : '',
                    })(
                      <Select
                        showSearch
                        placeholder="Select a Source"
                        optionFilterProp="children"
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
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24} style={{ marginTop: '15px' }}></Col>
                <Col span={24}>
                  <p
                    className="ant-form-item"
                    style={{ marginBottom: '0px', fontWeight: '600' }}
                  >
                    What profession are you in, apart from freelance writing?
                  </p>
                </Col>
                <Col span={24}>
                  <FormItem>
                    {getFieldDecorator('currentProfession', {
                      valuePropName: 'value',
                    })(<TextArea style={{ height: '80px' }} />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Save for Later
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={12} style={{ textAlign: 'left' }}>
                  <Form.Item>
                    <Button type="danger" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
        <Col span={5}></Col>
      </Row>{' '}
    </>
  );
}

const WrappedProfileForm = Form.create({ name: 'profile' })(
  CompleteProfileDetails
);

export default WrappedProfileForm;
