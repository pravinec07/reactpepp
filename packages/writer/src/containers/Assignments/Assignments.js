import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import articleActions from '@iso/redux/article/actions';
import { Tabs, Row, Col, Card } from 'antd';
import Assignments from '@iso/containers/Assignments/Assignments';
import DisplayPageDetails from '@iso/containers/DisplayPageDetails/DisplayPageDetails';
import BasicStyle from './Assignments.style';
const STATUS = {
  IN_PROGRESS: 'In-Progress',
  SUBMITTED: 'Submitted',
  COMPLETED: 'Completed',
  REJECTED: 'Rejected',
};
const { TabPane } = Tabs;
const { cardStyle, rowStyle, colStyle } = BasicStyle;
const { getArticle } = articleActions;
function onStatusChange(row, col) {
  console.log(row, col);
}
export default function AssignmentCantainer() {
  const { articles } = useSelector(state => state.Article);
  const [articlesData, setArticle] = useState([]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getArticle());
  }, [dispatch]);
  return (
    <Card>
      <Row span={24} gutter={16} style={rowStyle}>
        <Col span={16} style={colStyle}>
          <Card hoverable={true} style={cardStyle}>
            <Tabs
              defaultActiveKey="1"
              onChange={() => setArticle(articlesData)}
            >
              <TabPane tab="All" key="1">
                <Assignments
                  clearFilters={() => {}}
                  clearAll={() => {}}
                  data={articles}
                  onStatusChange={onStatusChange}
                />
              </TabPane>
              <TabPane tab="Ongoing Assignments" key="2">
                <Assignments
                  clearFilters={() => {}}
                  clearAll={() => {}}
                  data={articles.filter(
                    item => item.status === STATUS.IN_PROGRESS
                  )}
                  onStatusChange={onStatusChange}
                />
              </TabPane>
              <TabPane tab="Submitted by Portal" key="3">
                <Assignments
                  clearFilters={() => {}}
                  clearAll={() => {}}
                  data={articles.filter(
                    item => item.status === STATUS.SUBMITTED
                  )}
                  onStatusChange={onStatusChange}
                />
              </TabPane>
              <TabPane tab="Completed" key="4">
                <Assignments
                  clearFilters={() => {}}
                  clearAll={() => {}}
                  data={articles.filter(
                    item => item.status === STATUS.COMPLETED
                  )}
                  onStatusChange={onStatusChange}
                />
              </TabPane>
              <TabPane tab="Rejected" key="5">
                <Assignments
                  clearFilters={() => {}}
                  clearAll={() => {}}
                  data={articles.filter(
                    item => item.status === STATUS.REJECTED
                  )}
                  onStatusChange={onStatusChange}
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>

        <Col span={8} style={colStyle}>
          <Card hoverable={true} style={cardStyle}>
            <DisplayPageDetails />
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
