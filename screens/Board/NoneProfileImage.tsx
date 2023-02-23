import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {imgStyle: string};

export default function NoneProfileImage({imgStyle}: Props) {
  return (
    <Container styled={imgStyle}>
      <PersonIcon />
    </Container>
  );
}

const Container = styled.View<{styled: string}>`
  ${x => x?.styled}
  width: 100%;
  height: 100%;
`;
const PersonIcon = styled(Icon).attrs(() => ({
  name: 'person',
}))`
  color: #999999;
  font-size: 28px;
`;
