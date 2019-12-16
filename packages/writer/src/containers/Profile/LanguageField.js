import React from 'react';
import { Form, Icon, Row, Col, Checkbox, Select } from 'antd';

import ContentWrapper from './Profile.styles';
const { Option } = Select;
const options = [
  { label: 'Can read', value: 1 },
  { label: 'Basic writing', value: 2 },
  { label: 'Experienced writing', value: 3 },
];

export default function LanguageField() {
  return (
    <ContentWrapper>
      <Row gutter={24} style={{ display: 'flex', alignItems: 'center' }}>
        <Col span={2}>
          <span className="ant-form-item">Laguage</span>
        </Col>
        <Col span={7}>
          <Select onChange={null}>
            <Option value="">Select language...</Option>
            <Option value="US">English</Option>
            <Option value="CA">Hindi</Option>
          </Select>
        </Col>
        <Col span={12}>
          <Checkbox.Group
            options={options}
            defaultValue={[1, 2, 3]}
            onChange={null}
          />
        </Col>
        <Col span={3}>
          <Icon type="plus-circle" style={{ fontSize: '20px' }} />
        </Col>
      </Row>
    </ContentWrapper>
  );
}
