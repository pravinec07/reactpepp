import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Button, Select } from 'antd';
import ArticleDetails from '../Articles/Articles';

import { AssignmentsContainer, AssignmentsStyles } from './Assignments.styles';
import Constants from '../../../common/Utilities/Constants';

export default function Assignments(props) {
  console.log('----pros--->', props);
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
      render: key => {
        return (
          <Select defaultValue={key} name="status">
            <Select.Option value={'In-Progress'} label={'In-Progress'} key={1}>
              In-Progress
            </Select.Option>
            <Select.Option value={'Rework'} label={'Rework'} key={2}>
              Rework
            </Select.Option>
            <Select.Option value={'Completed'} label={'Completed'} key={3}>
              Completed
            </Select.Option>
            <Select.Option value={'Rejected'} label={'Rejected'} key={4}>
              Rejected
            </Select.Option>
            <Select.Option value={'Success'} label={'Success'} key={5}>
              Success
            </Select.Option>
            <Select.Option value={'Submitted'} label={'Submitted'} key={6}>
              Submitted
            </Select.Option>
          </Select>
        );
      },
    },
  ];

  return (
    <AssignmentsContainer>
      <AssignmentsStyles />
      <div className="table-operations">
        <Button onClick={props.clearFilters}>Clear filters</Button>
        <Button onClick={props.clearAll}>Clear filters and sorters</Button>
      </div>
      <Table
        columns={columns}
        dataSource={props.data}
        onRow={row => {
          props.onStatusChange(row);
        }}
        expandedRowRender={record =>
          record.articles.length && <ArticleDetails data={record.articles} />
        }
      />
    </AssignmentsContainer>
  );
}
