import React, { Fragment, useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Form, Input, Upload, Icon, Row, Col, Button, Table, Card } from 'antd';

export default function AddArticlesForm(props) {
  const { articlesData } = props;
  const { getFieldDecorator } = props.data.form;
  const { TextArea } = Input;
  let { sortedInfo, filteredInfo } = useSelector;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: 'Article Name',
      dataIndex: 'articleTopic',
      key: 'articleTopic',
      sorter: (a, b) => a.articleTopic - b.articleTopic,
      sortOrder: sortedInfo.columnKey === 'articleTopic' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Word Count',
      dataIndex: 'wordCount',
      key: 'wordCount',
      sorter: (a, b) => a.wordCount - b.wordCount,
      sortOrder: sortedInfo.columnKey === 'wordCount' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.description - b.description,
      sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
      sorter: (a, b) => a.reference - b.reference,
      sortOrder: sortedInfo.columnKey === 'reference' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Keywords',
      dataIndex: 'keyword',
      key: 'keyword',
      sorter: (a, b) => a.keyword - b.keyword,
      sortOrder: sortedInfo.columnKey === 'keyword' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      sorter: (a, b) => a.actions - b.actions,
      sortOrder: sortedInfo.columnKey === 'actions' && sortedInfo.order,
      ellipsis: true,
      render: (key, record) => {
        return (
          <div>
            <Icon type="eye" />
            <Icon type="edit" />
            <Icon type="delete" />
          </div>
        );
      },
    },
  ];

  return (
    <Fragment>
      <Row>
        <Col span={3}></Col>
        <Col span={18}>
          <Card
            type="inner"
            title="Add Article"
            style={{ marginBottom: '20px' }}
          >
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label="No. Of Articles">
                  {getFieldDecorator('noOfArticles', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input no. of Articles',
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={18}>
                <Form.Item label="Article Topic">
                  {getFieldDecorator('articleTopic', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your topic!',
                        whitespace: true,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Word Count">
                  {getFieldDecorator('wordCount', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input word count',
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Keyword">
                  {getFieldDecorator('keyword', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input keyword',
                      },
                    ],
                  })(<TextArea />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="References">
                  {getFieldDecorator('references', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input References',
                      },
                    ],
                  })(<TextArea />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label="Description">
                  {getFieldDecorator('description', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input Description',
                      },
                    ],
                  })(<TextArea style={{ height: '120px' }} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24} style={{ float: 'right' }}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add
                  </Button>
                </Form.Item>
                <hr />
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="Download File">
                      <Button type="primary" htmlType="Download CSV">
                        Download CSV
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Upload file">
                      {getFieldDecorator('dragger', {
                        valuePropName: 'fileList',
                        // getValueFromEvent: this.normFile,
                      })(
                        <Upload.Dragger
                          name="files"
                          action="/upload.do"
                          style={{ height: '100px' }}
                        >
                          <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                          </p>
                          <p className="ant-upload-text">
                            Click or drag file to this area to upload
                          </p>
                          <p className="ant-upload-hint">
                            Support for a single or bulk upload.
                          </p>
                        </Upload.Dragger>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Table columns={columns} dataSource={articlesData} />
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={3}></Col>
      </Row>
    </Fragment>
  );
}
