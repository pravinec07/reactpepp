import React from './node_modules/react';
import { Link } from './node_modules/react-router-dom';
import Image from './node_modules/@iso/assets/images/rob.png';
import IntlMessages from './node_modules/@iso/components/utility/intlMessages';
import FourZeroFourStyleWrapper from './404.styles';

export default function() {
  return (
    <FourZeroFourStyleWrapper className="iso404Page">
      <div className="iso404Content">
        <h1>
          <IntlMessages id="page404.title" />
        </h1>
        <h3>
          <IntlMessages id="page404.subTitle" />
        </h3>
        <p>
          <IntlMessages id="page404.description" />
        </p>
        <Link to="/dashboard">
          <button type="button">
            <IntlMessages id="page404.backButton" />
          </button>
        </Link>
      </div>

      <div className="iso404Artwork">
        <img alt="#" src={Image} />
      </div>
    </FourZeroFourStyleWrapper>
  );
}
