import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

type Props = {
  size?: 'large' | 'small';
  color?: string;
};

export default function Loading({size = 'large', color = '#dedede'}: Props) {
  return (
    <LoadingContainer>
      <ActivityIndicator size={size} color={color} />
    </LoadingContainer>
  );
}

const LoadingContainer = styled.View`
  justify-content: center;
  align-items: center;
  min-height: 200px;
  max-height: 500px;
`;
