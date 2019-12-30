import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { ProfileWrapper } from './Profile.styles';

export default function ViewProfile(...props) {
  const { profile } = useSelector(state => state.Auth);
  return <></>;
}
