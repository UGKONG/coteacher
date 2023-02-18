/* eslint-disable react/react-in-jsx-scope */

import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

type Props = {
  size?: 'large' | 'small';
  color?: string;
};

export default function Loading({size = 'large', color = '#00ADA9'}: Props) {
  return <ActivityIndicator size={size} color={color} />;
}

export const LoadingContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 100px;
`;
