import React, { Fragment } from 'react';
import { Form, Card, Modal, Input, Button, Row, Col, Icon } from 'antd';
let completeOTP = '';
export default function OTPInput(props) {
  const handleNumberChange = e => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    } else {
      completeOTP += number.toString();
      triggerChange(completeOTP);
    }
  };

  const triggerChange = changedValue => {
    const { onChange, value } = props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  function handleEnter(event) {
    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);
    index < 5 && form.elements[index + 1].focus();
  }

  return (
    <form>
      <Input.Group size="large" className="otp-input-group">
        <Row gutter={8}>
          <Col span={4}>
            <Input onKeyUp={handleEnter} onChange={handleNumberChange} />
          </Col>
          <Col span={4}>
            <Input onKeyUp={handleEnter} onChange={handleNumberChange} />
          </Col>
          <Col span={4}>
            <Input onKeyUp={handleEnter} onChange={handleNumberChange} />
          </Col>
          <Col span={4}>
            <Input onKeyUp={handleEnter} onChange={handleNumberChange} />
          </Col>
          <Col span={4}>
            <Input onKeyUp={handleEnter} onChange={handleNumberChange} />
          </Col>
          <Col span={4}>
            <Input onKeyUp={handleEnter} onChange={handleNumberChange} />
          </Col>
        </Row>
      </Input.Group>
    </form>
  );
}
