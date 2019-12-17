import React, { useState } from 'react';
import { Table, Button, Select } from 'antd';
import data from './data';

import { ArticleContainer, ArticleStyles } from './Article.styles';

export default function Articles({ data }) {
  const columns = [
    {
      title: 'Article Code',
      dataIndex: 'articleCode',
      key: 'articleCode',
      ellipsis: true,
    },
    {
      title: 'Topic Name',
      dataIndex: 'articleTopic',
      key: 'articleTopic',
      ellipsis: true,
    },
    {
      title: 'Word Count',
      dataIndex: 'word',
      key: 'word',
      ellipsis: true,
    },
    {
      title: 'Date Created',
      dataIndex: 'createdDate',
      key: 'createdDate',
      ellipsis: true,
    },
    {
      title: 'File Link',
      dataIndex: 'transactiondocumentUrl',
      key: 'transactiondocumentUrl',
      ellipsis: true,
    },
  ];

  return (
    <ArticleContainer>
      <ArticleStyles />

      <Table columns={columns} dataSource={data} pagination={false} />
    </ArticleContainer>
  );
}
