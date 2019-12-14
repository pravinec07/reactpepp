import React, { useState } from 'react';
import { Table, Button, Select } from 'antd';
import data from './data';

import { ArticleContainer, ArticleStyles } from './Article.styles';

export default function Articles() {
  const columns = [
    {
      title: 'S.No.',
      dataIndex: 'sNo',
      key: 'sNo',
      ellipsis: true,
    },
    {
      title: 'Article Code',
      dataIndex: 'projectCode',
      key: 'projectCode',
      ellipsis: true,
    },
    {
      title: 'Topic Name',
      dataIndex: 'projectName',
      key: 'projectName',
      ellipsis: true,
    },
    {
      title: 'Word Count',
      dataIndex: 'noOfArticles',
      key: 'noOfArticles',
      ellipsis: true,
    },
    {
      title: 'Date Created',
      dataIndex: 'dueDate',
      key: 'dueDate',
      ellipsis: true,
    },
    {
      title: 'File Link',
      dataIndex: 'dueDate',
      key: 'dueDate',
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
