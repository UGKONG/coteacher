import styled from 'styled-components/native';

export default function NoneItem({text}: {text?: string}) {
  return (
    <Container>
      <Text>{text ?? '항목이 없습니다.'}</Text>
    </Container>
  );
}

const Container = styled.View`
  height: 200px;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  color: #aaaaaa;
`;
