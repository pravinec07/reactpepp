import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import articleActions from '../../redux/articles/actions';
import { Row, Col, Card } from 'antd';
import ArticlesListing from './MyArticlesListing';
import ArticleDetails from './ArticleDetails';
import BasicStyle from './Assignments.style';
const { cardStyle, rowStyle, colStyle } = BasicStyle;
const { getArticle } = articleActions;

export default function AssignmentCantainer() {
  const { articles } = useSelector(state => state.Articles);
  const [currentArticle, setCurrentArticle] = useState(null);
  const dispatch = useDispatch();
  function onChangeArticle(row) {
    setCurrentArticle(row);
  }
  React.useEffect(() => {
    dispatch(getArticle());
  }, [dispatch]);
  return (
    <Card>
      <Row span={24} gutter={16} style={rowStyle}>
        <Col span={currentArticle ? 16 : 24} style={colStyle}>
          <Card hoverable={true} style={cardStyle}>
            <ArticlesListing
              clearFilters={() => {}}
              clearAll={() => {}}
              data={articles}
              onChangeArticle={onChangeArticle}
            />
          </Card>
        </Col>

        {currentArticle && (
          <Col span={8} style={colStyle}>
            <Card hoverable={true} style={cardStyle}>
              <ArticleDetails currentArticle={currentArticle} />
            </Card>
          </Col>
        )}
      </Row>
    </Card>
  );
}
