import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig from '@iso/config/site.config';
// import logopic from '@iso/assets/images/.png';
export default ({ collapsed, type }) => {
  switch (type) {
    case siteConfig.panelType.writer:
      return (
        <div className="isoLogoWrapper">
          {collapsed ? (
            <div>
              <h3>
                <Link to="/dashboard">{/* <img src={logopic}></img> */}</Link>
              </h3>
            </div>
          ) : (
            <h3>
              <Link to="/dashboard">{siteConfig.writer.siteName}</Link>
            </h3>
          )}
        </div>
      );
      break;
    case siteConfig.panelType.editor:
      return (
        <div className="isoLogoWrapper">
          {collapsed ? (
            <div>
              <h3>
                <Link to="/dashboard">
                  <i className={siteConfig.siteIcon} />
                </Link>
              </h3>
            </div>
          ) : (
            <h3>
              <Link to="/dashboard">{siteConfig.siteName}</Link>
            </h3>
          )}
        </div>
      );
      break;
    case siteConfig.panelType.allotment:
      return (
        <div className="isoLogoWrapper">
          {collapsed ? (
            <div>
              <h3>
                <Link to="/dashboard">
                  <i className={siteConfig.siteIcon} />
                </Link>
              </h3>
            </div>
          ) : (
            <h3>
              <Link to="/dashboard">{siteConfig.siteName}</Link>
            </h3>
          )}
        </div>
      );
      break;
    case siteConfig.panelType.client:
      return (
        <div className="isoLogoWrapper">
          {collapsed ? (
            <div>
              <h3>
                <Link to="/dashboard">
                  <i className={siteConfig.siteIcon} />
                </Link>
              </h3>
            </div>
          ) : (
            <h3>
              <Link to="/dashboard">{siteConfig.siteName}</Link>
            </h3>
          )}
        </div>
      );
      break;
    default:
      return (
        <div className="isoLogoWrapper">
          {collapsed ? (
            <div>
              <h3>
                <Link to="/dashboard">
                  <i className={siteConfig.siteIcon} />
                </Link>
              </h3>
            </div>
          ) : (
            <h3>
              <Link to="/dashboard">{siteConfig.siteName}</Link>
            </h3>
          )}
        </div>
      );
  }
};
