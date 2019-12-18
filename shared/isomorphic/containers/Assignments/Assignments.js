import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Button, Select } from 'antd';
import ArticleDetails from '../Articles/Articles';

import { AssignmentsContainer, AssignmentsStyles } from './Assignments.styles';
import Constants from '../../../common/Utilities/Constants';

export default function Assignments(props) {
  let { sortedInfo, filteredInfo } = useSelector;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const { status, colors } = Constants;

  const columns = [
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
      dataIndex: 'totalArticle',
      key: 'totalArticle',
      sorter: (a, b) => a.totalArticle - b.totalArticle,
      sortOrder: sortedInfo.columnKey === 'totalArticle' && sortedInfo.order,
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
      // render: (key, record) => {
      //   return (
      //     <Select defaultValue={key} name="status" onChange={(key1, row)=>props.onStatusChange(key1, record)}>
      //       <Select.Option value={'In-Progress'} label={'In-Progress'} key={1}>
      //         In-Progress
      //       </Select.Option>
      //       <Select.Option value={'Rework'} label={'Rework'} key={2}>
      //         Rework
      //       </Select.Option>
      //       <Select.Option value={'Completed'} label={'Completed'} key={3}>
      //         Completed
      //       </Select.Option>
      //       <Select.Option value={'Rejected'} label={'Rejected'} key={4}>
      //         Rejected
      //       </Select.Option>
      //       <Select.Option value={'Success'} label={'Success'} key={5}>
      //         Success
      //       </Select.Option>
      //       <Select.Option value={'Submitted'} label={'Submitted'} key={6}>
      //         Submitted
      //       </Select.Option>
      //     </Select>
      //   );
      // },
    },
  ];

  return (
    <AssignmentsContainer>
      <AssignmentsStyles />
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
        expandedRowRender={record =>
          record.articles.length && <ArticleDetails data={record.articles} />
        }
      />
    </AssignmentsContainer>
  );
}
