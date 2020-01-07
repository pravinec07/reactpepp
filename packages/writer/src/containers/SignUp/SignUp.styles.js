import styled from 'styled-components';
import { palette } from 'styled-theme';
import bgImage from '@iso/assets/images/signIn.svg';
import WithDirection from '@iso/lib/helpers/rtl';

const SignUpStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  background: url(${bgImage}) no-repeat center center;
  background-size: cover;
  background-size: 60em;
  background-position: -5em 0em;
  @media only screen and (min-width: 1400px) {
    background-size: 70em;
  }
  .hide {
    opacity: 0;
    height: 0;
  }
  &:before {
    content: '';
    width: 50%;
    height: 100%;
    display: flex;
    position: absolute;
    z-index: 1;
    top: 0;
    left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
    right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
  }

  .isoSignUpContentWrapper {
    width: 400px;
    height: 37em;
    overflow-y: auto;
    z-index: 10;
    position: relative;
    box-shadow: 0 3px 11px -1px rgba(69, 90, 100, 0.59);
    margin: 0em 5em;
  }

  .isoSignUpContent {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px 50px 0px 50px;
    position: relative;
    background-color: #fff;

    @media only screen and (max-width: 767px) {
      width: 100%;
      padding: 30px 20px;
    }

    .isoLogoWrapper {
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      justify-content: center;
      flex-shrink: 0;

      a {
        font-size: 24px;
        font-weight: 300;
        line-height: 1;
        text-transform: uppercase;
        color: ${palette('secondary', 2)};
      }
    }

    .isoSignUpForm {
      width: 100%;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      .ant-form-explain {
        font-size: 11px;
      }
      .isoInputWrapper {
        margin-bottom: 0;

        &:last-child {
          margin-bottom: 0;
        }

        input {
          &::-webkit-input-placeholder {
            color: ${palette('grayscale', 0)};
          }

          &:-moz-placeholder {
            color: ${palette('grayscale', 0)};
          }

          &::-moz-placeholder {
            color: ${palette('grayscale', 0)};
          }
          &:-ms-input-placeholder {
            color: ${palette('grayscale', 0)};
          }
        }
      }

      .isoLeftRightComponent {
        input {
          width: calc(100% - 10px);

          &:first-child {
            margin-right: ${props =>
              props['data-rtl'] === 'rtl' ? 'inherit' : '20px'};
            margin-left: ${props =>
              props['data-rtl'] === 'rtl' ? '20px' : 'inherit'};
          }
        }
      }

      .isoHelperWrapper {
        margin-top: 5px;
        flex-direction: column;
      }

      .isoForgotPass {
        font-size: 12px;
        color: ${palette('text', 2)};
        margin-bottom: 10px;

        &:hover {
          color: ${palette('primary', 0)};
        }
      }

      button {
        font-weight: 500;
        width: 100%;
        height: 42px;
        border: 0;

        &.btnFacebook {
          background-color: ${palette('color', 7)};

          &:hover {
            background-color: ${palette('color', 8)};
          }
        }

        &.btnGooglePlus {
          background-color: ${palette('color', 9)};
          margin-top: 15px;

          &:hover {
            background-color: ${palette('color', 10)};
          }
        }

        &.btnAuthZero {
          background-color: ${palette('color', 11)};
          margin-top: 15px;

          &:hover {
            background-color: ${palette('color', 12)};
          }
        }

        &.btnFirebase {
          background-color: ${palette('color', 5)};
          margin-top: 15px;

          &:hover {
            background-color: ${palette('color', 6)};
          }
        }

        &.btnAccountKit {
          ${'' /* background-color: rgb(150, 189, 235); */}
          margin-top: 15px;

          &:hover {
            ${'' /* background-color: ${palette('color', 6)}; */}
          }
        }
      }
    }
  }
  .customInput {
    border: none;
    border-bottom: 1px solid #5d5b5bd9;
    border-radius: 0;
    box-shadow: none;
    padding: 12px 16px 12px 0px;
    height: 47px;
    background: transparent;
    font-size: 14px;
  }
  .customInput:focus {
    border-bottom: 2px solid #3f9cb5;
    box-shadow: none;
  }
  .customInput:invalid {
    border: none;
    box-shadow: none;
    background: transparent;
  }
  .pepper_heading {
    position: absolute;
    top: 0em;
    left: 21em;
  }
  .pepper_heading h1 {
    font-size: 3em;
    font-family: roboto;
    font-weight: 300;
    color: #16224f;
  }
`;

export default WithDirection(SignUpStyleWrapper);
