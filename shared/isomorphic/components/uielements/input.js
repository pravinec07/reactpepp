import React from 'react';
import { Input } from 'antd';
import {
  InputWrapper,
  InputGroupWrapper,
  InputSearchWrapper,
  TextAreaWrapper,
} from './styles/input.style';
import WithDirection from '@iso/lib/helpers/rtl';
import Icon from '@iso/components/uielements/icon';

const { Search, TextArea, Group } = Input;

const WDStyledInput = InputWrapper(Input);
const StyledInput = WithDirection(WDStyledInput);

function inputWrapper(props) {
  if (props.type === 'password' && props.showHide) {
    const [showPassword, setShowPassword] = React.useState(false);
    const prefixSelector = showPassword ? (
      <Icon onClick={() => setShowPassword(!showPassword)} type="eye" />
    ) : (
      <Icon
        onClick={() => setShowPassword(!showPassword)}
        type="eye-invisible"
      />
    );
    return (
      <Input
        {...props}
        addonAfter={props.addonAfter || prefixSelector}
        type={showPassword ? 'text' : 'password'}
        placeholder={props.placeholder || 'Password'}
      />
    );
  } else {
    return <StyledInput {...props} />;
  }
}

const WDInputGroup = InputGroupWrapper(Group);
const InputGroup = WithDirection(WDInputGroup);

const WDInputSearch = InputSearchWrapper(Search);
const InputSearch = WithDirection(WDInputSearch);

const WDTextarea = TextAreaWrapper(TextArea);
const Textarea = WithDirection(WDTextarea);

export default inputWrapper;
export { InputSearch, InputGroup, Textarea };
