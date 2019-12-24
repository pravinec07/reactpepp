import React, { Fragment } from 'react';
import { Form, Input, Row, Col, Button, Radio, Select, Checkbox } from 'antd';

export default function Step2(props) {
  const { getFieldDecorator } = props.data.form;
  const { TextArea } = Input;
  const { Option } = Select;
  const { handleSelectChange, handleRadioChange, radios, identityType } = props;
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  return (
    <Fragment>
      {(identityType === 1 || identityType === 3) && (
        <Row gutter={24}>
          <Col xs={24}>
            <Form.Item label="Primary industry">
              <Radio.Group name="primaryIndustry" onChange={handleRadioChange}>
                <Radio style={radioStyle} key={'primaryIndustry1'} value={1}>
                  Health and Medical
                </Radio>
                <Radio style={radioStyle} key={'primaryIndustry2'} value={2}>
                  Business and Finance
                </Radio>
                <Radio style={radioStyle} key={'primaryIndustry3'} value={3}>
                  Technical
                </Radio>
                <Radio style={radioStyle} key={'primaryIndustry4'} value={4}>
                  Deep Technical- AI/ML/IoT/Cybersecurity
                </Radio>
                <Radio style={radioStyle} key={'primaryIndustry5'} value={5}>
                  Lifestyle and Fashion
                </Radio>
                <Radio style={radioStyle} key={'primaryIndustry6'} value={6}>
                  Food and Beverage/Nutrition
                </Radio>
                <Radio style={radioStyle} key={'primaryIndustry7'} value={7}>
                  News Content/Entertainment
                </Radio>
                <Radio style={radioStyle} key={'primaryIndustry8'} value={8}>
                  Travel and Hospitality
                </Radio>
                <Radio style={radioStyle} key={'primaryIndustry9'} value={9}>
                  Sports and Recreation
                </Radio>
                <Radio style={radioStyle} key={'primaryIndustry10'} value={10}>
                  Real Estate
                </Radio>
                <Radio style={radioStyle} key={'primaryIndustry11'} value={11}>
                  Astrology and Spiritual
                </Radio>{' '}
                <Radio style={radioStyle} key={'primaryIndustry12'} value={12}>
                  Generic
                </Radio>
                <Radio style={radioStyle} key={'primaryIndustry13'} value={13}>
                  Other
                  {radios.primaryIndustry === 13 ? (
                    <Input
                      name="primaryIndustryOther"
                      style={{ width: 100, marginLeft: 10 }}
                    />
                  ) : null}
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Are you looking for Indian language content as well(Translations/Transcriptions)">
              <Radio.Group name="isLanguage" onChange={handleRadioChange}>
                <Radio style={radioStyle} key={'language1'} value={1}>
                  Yes
                </Radio>
                <Radio style={radioStyle} key={'language2'} value={2}>
                  No
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          {radios.isLanguage === 1 && (
            <Col xs={24}>
              <Form.Item label="If 'Yes' then could you tell us ehich languages?">
                {getFieldDecorator('language', {
                  rules: [
                    {
                      required: false,
                      message: 'Please select languages',
                    },
                  ],
                })(
                  <Checkbox.Group style={{ width: '100%' }}>
                    <Checkbox style={radioStyle} value="1">
                      Hindi
                    </Checkbox>
                    <Checkbox style={radioStyle} value="2">
                      Tamil
                    </Checkbox>
                    <Checkbox style={radioStyle} value="3">
                      Telugu
                    </Checkbox>
                    <Checkbox style={radioStyle} value="4">
                      Urdu
                    </Checkbox>
                    <Checkbox style={radioStyle} value="5">
                      Kannada
                    </Checkbox>
                    <Checkbox style={radioStyle} value="6">
                      Malayalam
                    </Checkbox>
                    <Checkbox style={radioStyle} value="7">
                      Gujarati
                    </Checkbox>
                    <Checkbox style={radioStyle} value="8">
                      Marathi
                    </Checkbox>
                    <Checkbox style={radioStyle} value="9">
                      Punjabi
                    </Checkbox>
                    <Checkbox style={radioStyle} value="10">
                      Bangla
                    </Checkbox>
                  </Checkbox.Group>
                )}
              </Form.Item>
            </Col>
          )}
          <Col xs={24}>
            <Form.Item label="Volume of content pieces per month?">
              {getFieldDecorator('volume', {
                rules: [
                  {
                    required: true,
                    message: 'Please select volume',
                    whitespace: true,
                  },
                ],
              })(
                <Select placeholder="-Select-">
                  <Option key={'volume1'} value="type1">
                    1-10
                  </Option>
                  <Option key={'volume2'} value="type2">
                    10-20
                  </Option>
                  <Option key={'volume3'} value="type2">
                    20-40
                  </Option>
                  <Option key={'volume4'} value="type2">
                    40-70
                  </Option>
                  <Option key={'volume5'} value="type2">
                    70-100
                  </Option>
                  <Option key={'volume6'} value="type2">
                    >100
                  </Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Estimated monthly budget on content?(INR)">
              {getFieldDecorator('budget', {
                rules: [
                  {
                    required: true,
                    message: 'Please select Budget',
                    whitespace: true,
                  },
                ],
              })(
                <Select placeholder="-Select-">
                  <Option key={'budget1'} value="type1">
                    15,000-35,000
                  </Option>
                  <Option key={'budget2'} value="type2">
                    35,000-1,00,000
                  </Option>
                  <Option key={'budget3'} value="type2">
                    1,00,000-4,00,000
                  </Option>
                  <Option key={'budget4'} value="type2">
                    4,00,000-10,00,000
                  </Option>
                  <Option key={'budget5'} value="type2">
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
              })(<TextArea />)}
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Any Message or requirements you would like us to know of?">
              {getFieldDecorator('message', {
                rules: [
                  {
                    required: true,
                    message: 'Please input Message',
                  },
                ],
              })(<TextArea />)}
            </Form.Item>
          </Col>
        </Row>
      )}
      {identityType === 2 && (
        <Row gutter={24}>
          <Col xs={24}>
            <Form.Item label="How many clients do you create content for?">
              {getFieldDecorator('clientNo', {
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
                  <Checkbox style={radioStyle} value="1">
                    Full Service Marketing
                  </Checkbox>
                  <Checkbox style={radioStyle} value="2">
                    SEO
                  </Checkbox>
                  <Checkbox style={radioStyle} value="3">
                    Content/Inbound Marketing
                  </Checkbox>
                  <Checkbox style={radioStyle} value="4">
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
          <Button type="primary">Back</Button>
        </Col>
        <Col xs={12} sm={12} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
}
