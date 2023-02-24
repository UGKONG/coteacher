import {ViewStyle} from 'react-native';
import {StyleProp} from 'react-native';
import styled from 'styled-components/native';

export default function NoneItem({
  text,
  style,
}: {
  text?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Container style={style ?? {}}>
      <Text>{text ?? '항목이 없습니다.'}</Text>
    </Container>
  );
}

const Container = styled.View`
  height: 200px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const Text = styled.Text`
  color: #aaaaaa;
`;
