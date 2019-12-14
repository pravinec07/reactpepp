import React from 'react';
import { Tabs, Row, Col } from 'antd';
import Assignments from '@iso/containers/Assignments/Assignments';
import AssignmentDetails from '@iso/containers/Assignments/AssignmentDetails';

class ClientAssignments extends React.Component {
  handleChange = i => {
    console.log('lllllllllllll', i);
  };
  render() {
    const { TabPane } = Tabs;
    return (
      <div>
        <Row span={24}>
          <Col span={16}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="All" key="1">
                <Assignments
                  clearFilters={() => {}}
                  clearAll={() => {}}
                  handleChange={this.handleChange}
                />
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
          </Col>
          <Col span={8} style={{ 'border-left': '2px solid black' }}>
            <AssignmentDetails />
          </Col>
        </Row>
      </div>
    );
  }
}
export default ClientAssignments;
