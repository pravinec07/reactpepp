import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import articleActions from '@iso/redux/article/actions';
import { Tabs, Row, Col, Card } from 'antd';
import ArticlesListing from '@iso/containers/Writer/MyArticles/MyArticlesListing';
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
  const { articles } = useSelector(state => state.Articles);
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
            <ArticlesListing
              clearFilters={() => {}}
              clearAll={() => {}}
              data={articles}
              onStatusChange={onStatusChange}
            />
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
