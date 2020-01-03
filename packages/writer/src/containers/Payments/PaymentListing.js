import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Button } from 'antd';

import { PaymentContainer, PaymentStyles } from './Invoice.styles';
import { Constants } from '../../config/Constants';

export default function PaymentListing(props) {
  let { sortedInfo } = useSelector;
  sortedInfo = sortedInfo || {};
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
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
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
      title: 'Payment Date',
      dataIndex: 'transactionDate',
      key: 'paymentStatus',
      // sorter: (a, b) => a.paymentStatus - b.paymentStatus,
      sortOrder: sortedInfo.columnKey === 'paymentStatus' && sortedInfo.order,
      ellipsis: false,
    },
  ];

  return (
    <PaymentContainer>
      <PaymentStyles />
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
        bordered
      />
    </PaymentContainer>
  );
}
