import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {onPress: () => void};

export default function CreateButton({onPress}: Props) {
  return (
    <Container onPress={onPress}>
      <PlusIcon />
    </Container>
  );
}

const Container = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8,
}))`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: #008886cc;
  align-items: center;
  justify-content: center;
`;
const PlusIcon = styled(Icon).attrs(() => ({
  name: 'plus',
}))`
  color: #fff;
  font-size: 30px;
`;
