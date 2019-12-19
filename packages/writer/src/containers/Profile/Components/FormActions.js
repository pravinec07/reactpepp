import React from 'react';
import { Row, Col, Button } from 'antd';

export default function FromAction({ ...props }) {
  return (
    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 60]}>
      {props.isEdit ? (
        <>
          <Col span={2} offset={20}>
            <Button
              onClick={props.handleSubmit}
              type="primary"
              htmlType="button"
            >
              Update
            </Button>
          </Col>
          <Col span={2}>
            <Button
              onClick={() => props.setisEdit()}
              type="primary"
              htmlType="button"
            >
              Cancel
            </Button>
          </Col>
        </>
      ) : (
        <Col span={4} offset={20}>
          <Button
            onClick={() => props.setisEdit()}
            type="primary"
            htmlType="button"
          >
            Edit
          </Button>
        </Col>
      )}
    </Row>
  );
}
