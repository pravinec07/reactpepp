import React from 'react';
import { Row, Col, Form, PageHeader, Button, Icon } from 'antd';
import { ArticleDetailsWrapper } from './Articles.styles';

export default function({ data }) {
  return (
    <ArticleDetailsWrapper className="articleDetailsWrapper">
      <PageHeader
        // onBack={() => window.history.back()}
        title="Article Details"
        extra={[
          <Button key="3">
            <Icon type="printer" />
          </Button>,
          <Button key="2">
            <Icon type="file-pdf" />
          </Button>,
          <Button key="1" type="primary">
            <Icon type="share-alt" />
          </Button>,
        ]}
        className="article-details-heading"
      >
        <Form
          layout="vertical"
          //</ArticleDetailsWrapper> onSubmit={this.handleSubmit}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Article Code">
                <span className="value">ART -2927</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Time">
                <span className="value time">2d, 22hr, 14min</span>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Topic">
                <span className="value">
                  Biography of the famous actor irfan khan
                </span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Words">
                <span className="value">2500 words</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Deadline">
                <span className="value">20-03-2019</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Genre">
                <span className="value">Blog Post</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Vertical">
                <span className="value">Press Release</span>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Deadline">
                <span className="value">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </span>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="File Attached">
                <span className="value">
                  <a
                    download="foo.txt"
                    target="_blank"
                    href="https://www.gravatar.com/avatar/281c2df7dbce9284dca6059db944f8df?s=48&d=identicon&r=PG"
                  >
                    userFile.docx
                  </a>
                </span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button>Accept</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </PageHeader>
    </ArticleDetailsWrapper>
  );
}
