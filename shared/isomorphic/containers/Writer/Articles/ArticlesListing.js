import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Button, Select } from 'antd';
import ArticleDetails from './ArticleDetails';

import { ArticlesContainer, ArticlesStyles } from './Articles.styles';
import Constants from '../../../../common/Utilities/Constants';

export default function ArticlesListing(props) {
  let { sortedInfo, filteredInfo } = useSelector;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const { status, colors } = Constants;

  const columns = [
    {
      title: 'Sr.No.',
      dataIndex: 'srNo',
      key: 'srNo',
      ellipsis: true,
    },
    {
      title: 'Article Code',
      dataIndex: 'articleCode',
      key: 'articleCode',
      sorter: (a, b) => a.articleCode - b.articleCode,
      sortOrder: sortedInfo.columnKey === 'articleCode' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Topic',
      dataIndex: 'articleTopic',
      key: 'articleTopic',
      sorter: (a, b) => a.articleTopic - b.articleTopic,
      sortOrder: sortedInfo.columnKey === 'articleTopic' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Words',
      dataIndex: 'word',
      key: 'word',
      sorter: (a, b) => a.word - b.word,
      sortOrder: sortedInfo.columnKey === 'word' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      sorter: (a, b) => a.deadline - b.deadline,
      sortOrder: sortedInfo.columnKey === 'deadline' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Ganre',
      dataIndex: 'genre',
      key: 'genre',
      sorter: (a, b) => a.genre - b.genre,
      sortOrder: sortedInfo.columnKey === 'genre' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Time Remaining',
      dataIndex: 'RemainingTime',
      key: 'RemainingTime',
      sorter: (a, b) => a.RemainingTime - b.RemainingTime,
      sortOrder: sortedInfo.columnKey === 'RemainingTime' && sortedInfo.order,
      ellipsis: true,
    },
  ];

  return (
    <ArticlesContainer>
      <ArticlesStyles />
      {props.filters && (
        <div className="table-operations">
          <Button onClick={props.clearFilters}>Clear filters</Button>
          <Button onClick={props.clearAll}>Clear filters and sorters</Button>
        </div>
      )}
      <Table
        columns={columns}
        dataSource={props.data}
        onRow={(val, row) => {
          props.onStatusChange(val, row);
        }}
      />
    </ArticlesContainer>
  );
}
