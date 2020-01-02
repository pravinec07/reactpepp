import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Button, Select } from 'antd';

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
      dataIndex: 'id',
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
      title: 'Submission Date',
      dataIndex: 'deadline',
      key: 'deadline',
      sorter: (a, b) => a.deadline - b.deadline,
      sortOrder: sortedInfo.columnKey === 'deadline' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status - b.status,
      sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
      ellipsis: true,
      render: key => {
        return (() => {
          console.log(key, status);
          switch (key) {
            case status.INPROGRESS:
              return <span style={{ color: colors.INPROGRESS }}>{key}</span>;
            case status.REJECTED:
              return <span style={{ color: colors.REJECTED }}>{key}</span>;
            case status.COMPLETED:
              return <span style={{ color: colors.COMPLETED }}>{key}</span>;
            case status.SUBMITTED:
              return <span style={{ color: colors.SUBMITTED }}>{key}</span>;
            case status.REWORK:
              return <span style={{ color: colors.REWORK }}>{key}</span>;
            default:
              return <span style={{ color: colors.ALL }}>{key}</span>;
          }
        })();
      },
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      sorter: (a, b) => a.paymentStatus - b.paymentStatus,
      sortOrder: sortedInfo.columnKey === 'paymentStatus' && sortedInfo.order,
      ellipsis: true,
      render: key => {
        return (() => {
          switch (key) {
            case status.INPROGRESS:
              return <span style={{ color: colors.INPROGRESS }}>{key}</span>;
            case status.REJECTED:
              return <span style={{ color: colors.REJECTED }}>{key}</span>;
            case status.COMPLETED:
              return <span style={{ color: colors.COMPLETED }}>{key}</span>;
            case status.SUBMITTED:
              return <span style={{ color: colors.SUBMITTED }}>{key}</span>;
            case status.REWORK:
              return <span style={{ color: colors.REWORK }}>{key}</span>;
            default:
              return <span style={{ color: colors.ALL }}>{key}</span>;
          }
        })();
      },
    },
    {
      title: 'Rework',
      dataIndex: 'deadline',
      key: 'deadline',
      sorter: (a, b) => a.deadline - b.deadline,
      sortOrder: sortedInfo.columnKey === 'deadline' && sortedInfo.order,
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
