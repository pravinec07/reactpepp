import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button, Select } from 'antd';

import { ArticlesContainer, ArticlesStyles } from './Articles.styles';
import { Constants } from '../../config/Constants';

export default function ArticlesListing(props) {
  let { sortedInfo, filteredInfo } = useSelector;
  const [currentArticle, setCurrentArticle] = useState(null);
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const { status, colors } = Constants;

  const columns = [
    {
      title: 'Sr.No.',
      dataIndex: 'id',
      key: 'srNo',
      ellipsis: true,
    },
    {
      title: 'Article Code',
      dataIndex: 'articleCode',
      key: 'articleCode',
      // sorter: (a, b) => a.articleCode - b.articleCode,
      sortOrder: sortedInfo.columnKey === 'articleCode' && sortedInfo.order,
      ellipsis: false,
    },
    {
      title: 'Topic',
      dataIndex: 'articleTopic',
      key: 'articleTopic',
      // sorter: (a, b) => a.articleTopic - b.articleTopic,
      sortOrder: sortedInfo.columnKey === 'articleTopic' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Words',
      dataIndex: 'word',
      key: 'word',
      // sorter: (a, b) => a.word - b.word,
      sortOrder: sortedInfo.columnKey === 'word' && sortedInfo.order,
      ellipsis: false,
    },
    {
      title: 'Submission Date',
      dataIndex: 'deadLineDate',
      key: 'deadline',
      // sorter: (a, b) => a.deadline - b.deadline,
      sortOrder: sortedInfo.columnKey === 'deadline' && sortedInfo.order,
      ellipsis: false,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      // sorter: (a, b) => a.status - b.status,
      sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
      ellipsis: false,
      render: key => {
        return (() => {
          console.log(key, status);
          switch (key.toLowerCase()) {
            case 'on_going':
              return <span style={{ color: 'blue' }}>Ongoing</span>;
            case 'open':
              return <span style={{ color: colors.REJECTED }}>Open</span>;
            case 'sumited':
              return <span style={{ color: colors.SUBMITTED }}>Submited</span>;
            case 'rework':
              return <span style={{ color: colors.REWORK }}>Rework</span>;
            default:
              return <span style={{ color: colors.ALL }}>{key}</span>;
          }
        })();
      },
    },
    {
      title: 'Payment Status',
      dataIndex: 'transactionStatus',
      key: 'paymentStatus',
      // sorter: (a, b) => a.paymentStatus - b.paymentStatus,
      sortOrder: sortedInfo.columnKey === 'paymentStatus' && sortedInfo.order,
      ellipsis: false,
      render: key => {
        return (() => {
          switch (key.toLowerCase()) {
            case 'un-paid':
              return <span style={{ color: colors.REJECTED }}>UnPaid</span>;
            case 'paid':
              return <span style={{ color: colors.COMPLETED }}>Paid</span>;
            default:
              return <span style={{ color: colors.ALL }}>N/A</span>;
          }
        })();
      },
    },
    {
      title: 'Rework',
      dataIndex: 'revisions',
      key: 'deadline',
      sorter: (a, b) => a.deadline - b.deadline,
      sortOrder: sortedInfo.columnKey === 'deadline' && sortedInfo.order,
      ellipsis: true,
      render: data => (
        <span>
          {data && data.length
            ? data[data.length - 1].revisionCreatedDate
            : '--'}
        </span>
      ),
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
        onRowClick={(row, index) => {
          props.onChangeArticle(row, index);
        }}
      />
    </ArticlesContainer>
  );
}
