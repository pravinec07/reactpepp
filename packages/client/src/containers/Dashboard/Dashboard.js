import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Tabs, Table, Button } from 'antd';
import useWindowSize from '@iso/lib/hooks/useWindowSize';
import appActions from '@iso/redux/app/actions';
import ThemeSwitcher from '@iso/containers/ThemeSwitcher/ThemeSwitcher';
import siteConfig from '@iso/config/site.config';
import Assignments from '@iso/containers/Assignments/Assignments';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import DashboardRoutes from './DashboardRoutes';

import { DashboardContainer, DashboardGlobalStyles } from './Dashboard.styles';

const { Content, Footer } = Layout;
const { toggleAll } = appActions;
const styles = {
  layout: { flexDirection: 'row', overflowX: 'hidden' },
  content: {
    padding: '70px 0 0',
    flexShrink: '0',
    background: '#f1f3f6',
    position: 'relative',
  },
  footer: {
    background: '#ffffff',
    textAlign: 'center',
    borderTop: '1px solid #ededed',
  },
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const appHeight = useSelector(state => state.App.height);
  const { width, height } = useWindowSize();
  const { TabPane } = Tabs;
  React.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);
  return (
    <DashboardContainer>
      <DashboardGlobalStyles />
      <Layout style={{ height: height }}>
        <Topbar />
        <Layout style={styles.layout}>
          <Sidebar />
          <Layout
            className="isoContentMainLayout"
            style={{
              height: appHeight,
            }}
          >
            <Content
              className="client-assignment-Content"
              style={styles.content}
            >
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
            </Content>
            <Footer style={styles.footer}>{siteConfig.footerText}</Footer>
          </Layout>
        </Layout>
        <ThemeSwitcher />
      </Layout>
    </DashboardContainer>
  );
}
