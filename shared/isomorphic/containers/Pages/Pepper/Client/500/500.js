import React from './node_modules/react';
import { Link } from './node_modules/react-router-dom';
import Image from './node_modules/@iso/assets/images/rob.png';
import IntlMessages from './node_modules/@iso/components/utility/intlMessages';
import FiveZeroZeroStyleWrapper from './500.styles';

export default function() {
  return (
    <FiveZeroZeroStyleWrapper className="iso500Page">
      <div className="iso500Content">
        <h1>
          <IntlMessages id="page500.title" />
        </h1>
        <h3>
          <IntlMessages id="page500.subTitle" />
        </h3>
        <p>
          <IntlMessages id="page500.description" />
        </p>
        <Link to="/dashboard">
          <button type="button">
            <IntlMessages id="page500.backButton" />
          </button>
        </Link>
      </div>

      <div className="iso500Artwork">
        <img alt="#" src={Image} />
      </div>
    </FiveZeroZeroStyleWrapper>
  );
}
