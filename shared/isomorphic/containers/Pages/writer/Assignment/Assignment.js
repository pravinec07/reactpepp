import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'antd';
import useWindowSize from '@iso/lib/hooks/useWindowSize';
import data from './data';

import { AssignmentsContainer, AssignmentsStyles } from './Assignment.styles';

export default function Assignments() {
  const dispatch = useDispatch();
  const { width, height } = useWindowSize();
  let { sortedInfo, filteredInfo } = useSelector;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: 'S.No.',
      dataIndex: 'sNo',
      key: 'sNo',
      sorter: (a, b) => a.sNo - b.sNo,
      sortOrder: sortedInfo.columnKey === 'sNo' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Project Code',
      dataIndex: 'projectCode',
      key: 'projectCode',
      sorter: (a, b) => a.projectCode - b.projectCode,
      sortOrder: sortedInfo.columnKey === 'projectCode' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
      sorter: (a, b) => a.projectName - b.projectName,
      sortOrder: sortedInfo.columnKey === 'projectName' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'No Of Articles',
      dataIndex: 'noOfArticles',
      key: 'noOfArticles',
      sorter: (a, b) => a.noOfArticles - b.noOfArticles,
      sortOrder: sortedInfo.columnKey === 'noOfArticles' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: (a, b) => a.dueDate - b.dueDate,
      sortOrder: sortedInfo.columnKey === 'dueDate' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status - b.status,
      sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
      ellipsis: true,
    },
  ];

  return (
    <AssignmentsContainer>
      <AssignmentsStyles />
      <div className="table-operations">
        <Button onClick={dispatch.clearFilters}>Clear filters</Button>
        <Button onClick={dispatch.clearAll}>Clear filters and sorters</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={dispatch.handleChange}
      />
    </AssignmentsContainer>
  );
}
