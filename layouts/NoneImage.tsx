import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {size?: 'small' | 'big'};

const NoneImage = ({size = 'small'}: Props): JSX.Element => {
  return (
    <Container size={size}>
      <ImgIcon />
      <Text>이미지가 없습니다.</Text>
    </Container>
  );
};

export default NoneImage;

const Container = styled.View<Props>`
  ${x => (x?.size === 'big' ? 'width: 300px; height: 300px;' : 'flex: 1;')}
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
`;
const Text = styled.Text`
  color: #ddd;
  font-size: 12px;
`;
const ImgIcon = styled(Icon).attrs(() => ({
  name: 'images-outline',
  size: 36,
}))`
  color: #ddd;
  margin-bottom: 10px;
`;
