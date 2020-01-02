import React, { useEffect } from 'react';
import { Input, Row, Col } from 'antd';
let completeOTP = '';
export default function OTPInput(props) {
  const handleNumberChange = e => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    } else {
      completeOTP += number.toString();
      console.log(completeOTP, 'handleNumberChange');

      triggerChange(completeOTP);
    }
  };

  const triggerChange = changedValue => {
    const { onChange, value } = props;
    if (onChange) {
      console.log(onChange, 'triggerChange');
      onChange(changedValue);
    }
  };

  function handleEnter(event) {
    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);
    index < 5 && form.elements[index + 1].focus();
  }

  return (
    <>
      <Input.Group size="large" className="otp-input-group">
        <Row gutter={8}>
          <Col span={4}>
            <Input
              onKeyUp={handleEnter}
              onChange={handleNumberChange}
              maxLength={1}
            />
          </Col>
          <Col span={4}>
            <Input
              onKeyUp={handleEnter}
              onChange={handleNumberChange}
              maxLength={1}
            />
          </Col>
          <Col span={4}>
            <Input
              onKeyUp={handleEnter}
              onChange={handleNumberChange}
              maxLength={1}
            />
          </Col>
          <Col span={4}>
            <Input
              onKeyUp={handleEnter}
              onChange={handleNumberChange}
              maxLength={1}
            />
          </Col>
          <Col span={4}>
            <Input
              onKeyUp={handleEnter}
              onChange={handleNumberChange}
              maxLength={1}
            />
          </Col>
          <Col span={4}>
            <Input
              onKeyUp={handleEnter}
              onChange={handleNumberChange}
              maxLength={1}
            />
          </Col>
        </Row>
      </Input.Group>
    </>
  );
}
