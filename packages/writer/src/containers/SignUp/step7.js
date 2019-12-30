import React from 'react';

import { Link } from 'react-router-dom';
import IntlMessages from '@iso/components/utility/intlMessages';
function Step7({ form, dev }) {
  return (
    <div>
      <h1>Thank You!!!</h1>
      <p>Your account has been created successfully.</p>
      <p>You can login by email and password.</p>
      <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
        <Link to="/signin">
          <IntlMessages id="page.signinText" />
        </Link>
      </div>
    </div>
  );
}
export default Step7;
