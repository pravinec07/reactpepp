import styled from 'styled-components';
import bgImage from '@iso/assets/images/sign.jpg';
import WithDirection from '@iso/lib/helpers/rtl';

const FormWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url(${bgImage}) no-repeat center center;
  background-size: cover;

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    z-index: 1;
    top: 0;
    left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
    right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
  }
  .isoSignupContentWrapper {
    width: 500px;
    min-height: 500px;
    z-index: 10;
    position: relative;
    border-radius: 10px;
    overflow-x: auto;
  }

  label {
    font-weight: bold;
  }

  .full-width {
    width: 100%;
  }
`;

export default FormWrapper;

export const CardStyles = {
  background: 'grey',
};
