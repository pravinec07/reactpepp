import React, { Fragment } from 'react';
import { Form, Input, Row, Col, Button, Radio, Select, Checkbox } from 'antd';

export default function Step2(props) {
  const { getFieldDecorator } = props.data.form;
  const { TextArea } = Input;
  const { Option } = Select;
  const {
    handleNextBackAction,
    handleRadioChange,
    radios,
    identityType,
  } = props;
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  return (
    <Fragment>
      {(identityType === 'business' || identityType === 'individual') && (
        <Row gutter={24}>
          <Col xs={24}>
            <Form.Item label="Primary industry">
              {' '}
              {getFieldDecorator('industryType', {
                rules: [
                  {
                    required: false,
                    message: 'Please select industry type',
                  },
                ],
              })(
                <Radio.Group
                  name="primaryIndustry"
                  onChange={handleRadioChange}
                >
                  <Radio
                    style={radioStyle}
                    key={'Health and Medical'}
                    value="Health and Medical"
                  >
                    Health and Medical
                  </Radio>
                  <Radio
                    style={radioStyle}
                    key={'Business and Finance'}
                    value="Business and Finance"
                  >
                    Business and Finance
                  </Radio>
                  <Radio style={radioStyle} key={'Technical'} value="Technical">
                    Technical
                  </Radio>
                  <Radio
                    style={radioStyle}
                    key={'Deep Technical- AI/ML/IoT/Cybersecurity'}
                    value="Deep Technical- AI/ML/IoT/Cybersecurity"
                  >
                    Deep Technical- AI/ML/IoT/Cybersecurity
                  </Radio>
                  <Radio
                    style={radioStyle}
                    key={'Lifestyle and Fashion'}
                    value="Lifestyle and Fashion"
                  >
                    Lifestyle and Fashion
                  </Radio>
                  <Radio
                    style={radioStyle}
                    key={'Food and Beverage/Nutrition'}
                    value="Food and Beverage/Nutrition"
                  >
                    Food and Beverage/Nutrition
                  </Radio>
                  <Radio
                    style={radioStyle}
                    key={'News Content/Entertainment'}
                    value="News Content/Entertainment"
                  >
                    News Content/Entertainment
                  </Radio>
                  <Radio
                    style={radioStyle}
                    key={'Travel and Hospitality'}
                    value="Travel and Hospitality"
                  >
                    Travel and Hospitality
                  </Radio>
                  <Radio
                    style={radioStyle}
                    key={'Sports and Recreation'}
                    value="Sports and Recreation"
                  >
                    Sports and Recreation
                  </Radio>
                  <Radio
                    style={radioStyle}
                    key={'Real Estate'}
                    value="Real Estate"
                  >
                    Real Estate
                  </Radio>
                  <Radio
                    style={radioStyle}
                    key={'Astrology and Spiritual'}
                    value="Astrology and Spiritual"
                  >
                    Astrology and Spiritual
                  </Radio>{' '}
                  <Radio style={radioStyle} key={'Generic'} value="Generic">
                    Generic
                  </Radio>
                  <Radio style={radioStyle} key={'Other'} value={'Other'}>
                    Other
                    {radios.primaryIndustry === 13 ? (
                      <Input
                        name="primaryIndustryOther"
                        style={{ width: 100, marginLeft: 10 }}
                      />
                    ) : null}
                  </Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Are you looking for Indian language content as well(Translations/Transcriptions)">
              <Radio.Group name="isLanguage" onChange={handleRadioChange}>
                <Radio style={radioStyle} key={'language1'} value={'yes'}>
                  Yes
                </Radio>
                <Radio style={radioStyle} key={'language2'} value={'no'}>
                  No
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          {radios.isLanguage === 'yes' && (
            <Col xs={24}>
              <Form.Item label="If 'Yes' then could you tell us ehich languages?">
                {getFieldDecorator('languages', {
                  rules: [
                    {
                      required: false,
                      message: 'Please select languages',
                    },
                  ],
                })(
                  <Checkbox.Group style={{ width: '100%' }}>
                    <Checkbox style={radioStyle} value="Hindi">
                      Hindi
                    </Checkbox>
                    <Checkbox style={radioStyle} value="Tamil">
                      Tamil
                    </Checkbox>
                    <Checkbox style={radioStyle} value="Telugu">
                      Telugu
                    </Checkbox>
                    <Checkbox style={radioStyle} value="Urdu">
                      Urdu
                    </Checkbox>
                    <Checkbox style={radioStyle} value="Kannada">
                      Kannada
                    </Checkbox>
                    <Checkbox style={radioStyle} value="Malayalam">
                      Malayalam
                    </Checkbox>
                    <Checkbox style={radioStyle} value="Gujarati">
                      Gujarati
                    </Checkbox>
                    <Checkbox style={radioStyle} value="Marathi">
                      Marathi
                    </Checkbox>
                    <Checkbox style={radioStyle} value="Punjabi">
                      Punjabi
                    </Checkbox>
                    <Checkbox style={radioStyle} value="Bangla">
                      Bangla
                    </Checkbox>
                  </Checkbox.Group>
                )}
              </Form.Item>
            </Col>
          )}
          <Col xs={24}>
            <Form.Item label="Volume of content pieces per month?">
              {getFieldDecorator('volumeofContent', {
                rules: [
                  {
                    required: true,
                    message: 'Please select volume',
                    whitespace: true,
                  },
                ],
              })(
                <Select placeholder="-Select-">
                  <Option key={'volume1'} value="1-10">
                    1-10
                  </Option>
                  <Option key={'volume2'} value="10-20">
                    10-20
                  </Option>
                  <Option key={'volume3'} value="20-40">
                    20-40
                  </Option>
                  <Option key={'volume4'} value="40-70">
                    40-70
                  </Option>
                  <Option key={'volume5'} value="70-100">
                    70-100
                  </Option>
                  <Option key={'volume6'} value=">100">
                    >100
                  </Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Estimated monthly budget on content?(INR)">
              {getFieldDecorator('estimatedMonthlyBudget', {
                rules: [
                  {
                    required: true,
                    message: 'Please select Budget',
                    whitespace: true,
                  },
                ],
              })(
                <Select placeholder="-Select-">
                  <Option key={'budget1'} value="15,000-35,000">
                    15,000-35,000
                  </Option>
                  <Option key={'budget2'} value="35,000-1,00,000">
                    35,000-1,00,000
                  </Option>
                  <Option key={'budget3'} value="1,00,000-4,00,000">
                    1,00,000-4,00,000
                  </Option>
                  <Option key={'budget4'} value="4,00,000-10,00,000">
                    4,00,000-10,00,000
                  </Option>
                  <Option key={'budget5'} value=">10,00,000">
                    >10,00,000
                  </Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Could you tell us a bit about your online presence?(Website URL, Social Media URL or anything other you would like us to know.)"
              help="Sharing this information will allow our writers to better understand your business' tone, find ideas and avoid topics that have already been done."
            >
              {getFieldDecorator('url', {
                rules: [
                  {
                    required: true,
                    message: 'Please input Url',
                  },
                ],
              })(<TextArea maxLength="250" />)}
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Any Message or requirements you would like us to know of?">
              {getFieldDecorator('requirements', {
                rules: [
                  {
                    required: true,
                    message: 'Please input Message',
                  },
                ],
              })(<TextArea maxLength="250" />)}
            </Form.Item>
          </Col>
        </Row>
      )}
      {identityType === 'agency' && (
        <Row gutter={24}>
          <Col xs={24}>
            <Form.Item label="How many clients do you create content for?">
              {getFieldDecorator('contentFor', {
                rules: [
                  {
                    required: false,
                    message: 'Please input client content',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="What type of Marketing are you into?">
              {getFieldDecorator('marketingType', {
                rules: [
                  {
                    required: false,
                    message: 'Please input Marketing type',
                  },
                ],
              })(
                <Checkbox.Group style={{ width: '100%' }}>
                  <Checkbox style={radioStyle} value="Full Service Marketing">
                    Full Service Marketing
                  </Checkbox>
                  <Checkbox style={radioStyle} value="SEO">
                    SEO
                  </Checkbox>
                  <Checkbox
                    style={radioStyle}
                    value="Content/Inbound Marketing"
                  >
                    Content/Inbound Marketing
                  </Checkbox>
                  <Checkbox style={radioStyle} value="Website Creation">
                    Website Creation
                  </Checkbox>
                </Checkbox.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
      )}
      <Row gutter={24}>
        <Col xs={12} sm={12} style={{ textAlign: 'left' }}>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => handleNextBackAction(-1)}
          >
            Back
          </Button>
        </Col>
        <Col xs={12} sm={12} style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => handleNextBackAction(+1, true)}
          >
            Next
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
}
