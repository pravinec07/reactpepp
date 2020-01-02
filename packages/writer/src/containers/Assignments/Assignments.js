import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import articleActions from '../../redux/articles/actions';
import { Tabs, Row, Col, Card } from 'antd';
import ArticlesListing from './ArticlesListing';
import ArticleDetails from './ArticleDetails';
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
  // console.log(row, col);
}
export default function AssignmentCantainer() {
  const { articles } = useSelector(state => state.Articles);
  const [articlesData, setArticle] = useState([]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getArticle());
  }, [dispatch]);
  return (
    <Card>
      <Row span={24} gutter={16} style={rowStyle}>
        <Col span={12} style={colStyle}>
          <Card hoverable={true} style={cardStyle}>
            <Tabs
              defaultActiveKey="1"
              onChange={() => setArticle(articlesData)}
            >
              <TabPane tab="All" key="1">
                <ArticlesListing
                  clearFilters={() => {}}
                  clearAll={() => {}}
                  data={articles}
                  onStatusChange={onStatusChange}
                />
              </TabPane>
              <TabPane tab="Assignment Request" key="2">
                <ArticlesListing
                  clearFilters={() => {}}
                  clearAll={() => {}}
                  data={articles.filter(
                    item => item.status === STATUS.IN_PROGRESS
                  )}
                  onStatusChange={onStatusChange}
                />
              </TabPane>
              <TabPane tab="Ongoing Assignments" key="3">
                <ArticlesListing
                  clearFilters={() => {}}
                  clearAll={() => {}}
                  data={articles.filter(
                    item => item.status === STATUS.SUBMITTED
                  )}
                  onStatusChange={onStatusChange}
                />
              </TabPane>
              <TabPane tab="Rework Requirements" key="4">
                <ArticlesListing
                  clearFilters={() => {}}
                  clearAll={() => {}}
                  data={articles.filter(
                    item => item.status === STATUS.COMPLETED
                  )}
                  onStatusChange={onStatusChange}
                />
              </TabPane>
              <TabPane tab="Rejected" key="5">
                <ArticlesListing
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

        <Col span={12} style={colStyle}>
          <Card hoverable={true} style={cardStyle}>
            <ArticleDetails />
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
