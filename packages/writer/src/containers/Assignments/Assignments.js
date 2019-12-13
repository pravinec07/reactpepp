import React from 'react';
import { Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Assignments from '@iso/containers/Assignments/Assignments';

export default function Dashboard() {
  const dispatch = useDispatch();
  const appHeight = useSelector(state => state.App.height);
  const { TabPane } = Tabs;
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="All" key="1">
        <Assignments clearFilters={() => {}} clearAll={() => {}} />
      </TabPane>
      <TabPane tab="Ongoing Assignments" key="2">
        <Assignments clearFilters={() => {}} clearAll={() => {}} />
      </TabPane>
      <TabPane tab="Submitted by Portal" key="3">
        <Assignments clearFilters={() => {}} clearAll={() => {}} />
      </TabPane>
      <TabPane tab="Completed" key="4">
        <Assignments clearFilters={() => {}} clearAll={() => {}} />
      </TabPane>
      <TabPane tab="Rejected" key="5">
        <Assignments clearFilters={() => {}} clearAll={() => {}} />
      </TabPane>
    </Tabs>
  );
}
