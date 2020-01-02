import React from 'react';
import { Row, Col, Form, PageHeader, Button, Icon } from 'antd';
import { ArticleDetailsWrapper } from './Articles.styles';

export default function({ currentArticle }) {
  return (
    <ArticleDetailsWrapper className="articleDetailsWrapper">
      <PageHeader
        // onBack={() => window.history.back()}
        title="Artcle Details"
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
                <span className="value">{currentArticle.articleCode}</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Time">
                <span className="value time">
                  {currentArticle.RemainingTime}
                </span>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Topic">
                <span className="value">{currentArticle.articleTopic}</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Words">
                <span className="value">{currentArticle.word} words</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Deadline">
                <span className="value">{currentArticle.deadLineDate}</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Genre">
                <span className="value">{currentArticle.genre}</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Vertical">
                <span className="value">{currentArticle.vertical}</span>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Deadline">
                <span className="value">{currentArticle.details}</span>
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
