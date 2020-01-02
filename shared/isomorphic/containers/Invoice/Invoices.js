import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import articleActions from '@iso/redux/article/actions';
import { Tabs, Row, Col, Card, Badge, Icon, Button, Typography } from 'antd';
import ArticlesListing from '@iso/containers/Writer/Articles/ArticlesListing';
import DisplayPageDetails from '@iso/containers/DisplayPageDetails/DisplayPageDetails';
import BasicStyle from './Invoice.styles';
const STATUS = {
  IN_PROGRESS: 'In-Progress',
  SUBMITTED: 'Submitted',
  COMPLETED: 'Completed',
  REJECTED: 'Rejected',
};
const { Title } = Typography;
const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const { cardStyle, rowStyle, colStyle } = BasicStyle;
const { getArticle } = articleActions;
const styles = {
  content: {
    flexShrink: '0',
    background: '#ECEFF1',
    position: 'relative',
  },
  footer: {
    background: '#ffffff',
    textAlign: 'center',
    borderTop: '1px solid #ededed',
  },
};
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
    <div>
      <Card style={styles.content}>
        <Row span={24} gutter={16} style={rowStyle}>
          <Col>
            {' '}
            <Title level={4}>Payment Details</Title>
          </Col>
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
            <Card>
              <div>
                <h2 style={{ marginBottom: '10px' }}>
                  Article Details
                  <span style={{ float: 'right' }}>
                    <ButtonGroup>
                      <Button
                        style={{
                          color: '#16224f',
                          border: '1.5px solid #16224f',
                          padding: '7px 10px',
                          lineHeight: '10px',
                        }}
                      >
                        <Icon type="printer" style={{ fontSize: '16px' }} />
                      </Button>
                      &nbsp;
                      <Button
                        style={{
                          color: '#16224f',
                          border: '1.5px solid #16224f',
                          padding: '7px 10px',
                          lineHeight: '10px',
                        }}
                      >
                        <Icon type="export" style={{ fontSize: '16px' }} />
                      </Button>
                      &nbsp;
                      <Button
                        style={{
                          color: '#16224f',
                          border: '1.5px solid #16224f',
                          padding: '7px 10px',
                          lineHeight: '10px',
                        }}
                      >
                        <Icon type="share-alt" style={{ fontSize: '16px' }} />
                      </Button>
                      &nbsp;
                    </ButtonGroup>
                  </span>
                </h2>
                <p
                  style={{
                    color: '#777777',
                    fontWeight: '500',
                    marginBottom: '5px',
                    paddingBottom: '5px',
                    lineHeight: '2.3',
                  }}
                >
                  Article Code :{' '}
                  <span style={{ color: '#101010' }}> ART-018</span>
                </p>
                <p
                  style={{
                    color: '#777777',
                    fontWeight: '500',
                    marginBottom: '5px',
                    paddingBottom: '5px',
                    lineHeight: '2.3',
                  }}
                >
                  Topic :{' '}
                  <span style={{ color: '#101010' }}>
                    {' '}
                    Biography of the famous actor Irfan Khan 2019
                  </span>
                </p>
                <p
                  style={{
                    color: '#777777',
                    fontWeight: '500',
                    marginBottom: '5px',
                    paddingBottom: '5px',
                    lineHeight: '2.3',
                  }}
                >
                  Words : <span style={{ color: '#101010' }}> 2500 words</span>,{' '}
                  <span style={{ float: 'right' }}>
                    Deadline :{' '}
                    <span style={{ color: '#101010' }}> 20-10-2019</span>
                  </span>
                </p>
                <p
                  style={{
                    color: '#777777',
                    fontWeight: '500',
                    marginBottom: '5px',
                    paddingBottom: '5px',
                    lineHeight: '2.3',
                  }}
                >
                  Genre :{' '}
                  <span style={{ color: '#101010' }}> Lifestyle & Music</span>,{' '}
                  <span style={{ float: 'right' }}>
                    Vertical :{' '}
                    <span style={{ color: '#101010' }}> Software Industry</span>
                  </span>
                </p>
                <p
                  style={{
                    color: '#777777',
                    fontWeight: '500',
                    marginBottom: '5px',
                    paddingBottom: '5px',
                    lineHeight: '2.3',
                  }}
                >
                  Submitted File :{' '}
                  <span style={{ color: '#101010' }}>
                    {' '}
                    <a href="">
                      <Icon type="eye" /> Preview Assignment
                    </a>
                    , &nbsp;{' '}
                    <a href="">
                      <Icon type="download" /> Download Assignment
                    </a>
                  </span>
                </p>
                <p
                  style={{
                    color: '#777777',
                    fontWeight: '500',
                    marginBottom: '5px',
                    paddingBottom: '5px',
                    lineHeight: '2.3',
                  }}
                >
                  Transaction Id :{' '}
                  <span style={{ color: '#101010' }}> T13641003J2019</span>
                </p>
                <p
                  style={{
                    color: '#777777',
                    fontWeight: '500',
                    marginBottom: '5px',
                    paddingBottom: '5px',
                    lineHeight: '2.3',
                  }}
                >
                  Transaction Date :{' '}
                  <span style={{ color: '#101010' }}> 25/10/2019</span>
                </p>
                <p
                  style={{
                    color: '#777777',
                    fontWeight: '500',
                    marginBottom: '5px',
                    paddingBottom: '5px',
                    lineHeight: '2.3',
                  }}
                >
                  Transaction Amount :{' '}
                  <span style={{ color: '#101010' }}> Rs.2500 /-</span>
                </p>
                <p
                  style={{
                    color: '#777777',
                    fontWeight: '500',
                    marginBottom: '5px',
                    paddingBottom: '5px',
                    lineHeight: '2.3',
                  }}
                >
                  Payment Status :{' '}
                  <Badge
                    count={'success'}
                    style={{ backgroundColor: '#52c41a' }}
                  />
                </p>
                <p
                  style={{
                    color: '#777777',
                    fontWeight: '500',
                    marginBottom: '5px',
                    paddingBottom: '5px',
                    lineHeight: '2.3',
                  }}
                >
                  Print Invoice :{' '}
                  <span style={{ color: '#101010' }}>
                    {' '}
                    <a href="">
                      <Icon type="printer" /> Print
                    </a>
                  </span>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
