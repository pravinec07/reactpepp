import React from 'react';
import { Row, Col, Form, PageHeader, Button, Icon } from 'antd';
import DisplayDetailsModel from '../../Model/DisplayDetailsModel';
import { DisplayPageDetailsWrapper } from './DisplayPageDetails.styles';
const rawdata = [
  {
    label: 'Article Code',
    value: 'ART -2927',
    class: 'value',
    type: 'plainLabel',
  },
  {
    label: 'Time',
    value: '2d, 22hr, 14min',
    class: 'value time',
    type: 'plainLabel',
  },
  {
    label: 'Topic',
    value: ' Biography of the famous actor irfan khan',
    class: 'value',
    type: 'plainLabel',
  },
  { label: 'Words', value: '2500 words', class: 'value', type: 'plainLabel' },
  {
    label: 'Deadline',
    value: '20-03-2019',
    class: 'value',
    type: 'plainLabel',
  },
  { label: 'Genre', value: 'Blog Post', class: 'value', type: 'plainLabel' },
  {
    label: 'Vertical',
    value: ` do eiusmod tempor incididunt ut labore et dolore magna aliqua.
	Ut enim ad minim veniam, quis nostrud exercitation ullamco
	laboris nisi ut aliquip ex ea commodo consequat. Duis aute
	irure dolor in reprehenderit in voluptate velit esse cillum
	dolore eu fugiat nulla pariatur. Excepteur sint occaecat
	cupidatat non proident, sunt in culpa qui officia deserunt
	mollit anim id est laborum.`,
    class: 'value',
    colLength: 24,
    type: 'plainLabel',
  },
  {
    label: 'File Attached',
    fileName: 'foo.txt',
    href:
      'https://www.gravatar.com/avatar/281c2df7dbce9284dca6059db944f8df?s=48&d=identicon&r=PG',
    class: 'value',
    colLength: 24,
    type: 'anchorDownload',
  },
  { type: 'actions', value: [{ label: 'accept', action: () => {} }] },
];
export default function DisplayPageDetails({ data }) {
  const modifiedData = new DisplayDetailsModel(rawdata);
  const { pageHeader, articleDetails } = modifiedData.getData();
  return (
    <DisplayPageDetailsWrapper className="displayPageDetailsWrapper">
      <PageHeader
        // onBack={() => window.history.back()}
        title={pageHeader.title}
        extra={[
          <Button key="3" onClick={pageHeader.handlePrinter}>
            <Icon type="printer" />
          </Button>,
          <Button key="2" onClick={pageHeader.handlePdf}>
            <Icon type="file-pdf" />
          </Button>,
          <Button key="1" type="primary" onClick={pageHeader.handleShare}>
            <Icon type="share-alt" />
          </Button>,
        ]}
        className="article-details-heading"
      >
        <Form
          layout="vertical"
          //</AssignmentDetailsWrapper> onSubmit={this.handleSubmit}
        >
          <Row gutter={24}>
            {articleDetails.map((data, i) => {
              return (
                <Col span={data.colLength || 12} key={i}>
                  <Form.Item label={data.label || ''} style={{ padding: 0 }}>
                    {(() => {
                      switch (data.type) {
                        case 'plainLabel':
                          return (
                            <span className={data.class}>{data.value}</span>
                          );
                        case 'achorDownload':
                          return (
                            <span className={data.class}>
                              <a
                                download={data.fileName}
                                target="_blank"
                                href={data.href}
                              >
                                {data.label}
                              </a>
                            </span>
                          );
                        case 'actions':
                          return data.value.map((act, index) => (
                            <Button key={index} onClick={act.action}>
                              {act.label}
                            </Button>
                          ));
                        default:
                          return '';
                      }
                    })()}
                  </Form.Item>
                </Col>
              );
            })}
          </Row>
        </Form>
      </PageHeader>
    </DisplayPageDetailsWrapper>
  );
}
