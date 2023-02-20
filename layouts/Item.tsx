import {useNavigation} from '@react-navigation/native';
import {useMemo, useState} from 'react';
import styled from 'styled-components/native';

type Props = {
  title: string;
  itemClick: () => void;
};

export default function Item({title, itemClick}: Props) {
  const [isImageError, setIsImageError] = useState<boolean>(false);

  const imgURL = useMemo<string>(() => {
    let url = 'https://sanguk.gabia.io/img/';
    let result = url + title + '.png';
    return result;
  }, []);

  return (
    <Container onPress={itemClick}>
      <Wrap>
        <Name>{title}</Name>
        {isImageError ? (
          <NoneImage />
        ) : (
          <Image source={{uri: imgURL}} onError={() => setIsImageError(true)} />
        )}
      </Wrap>
    </Container>
  );
}

const Container = styled.TouchableHighlight.attrs(() => ({
  activeOpacity: 0.7,
  underlayColor: '#EDEDED',
}))`
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`;
const Wrap = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 50px;
  padding: 0 15px;
`;
const Name = styled.Text`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
`;
const imgStyle = `
  width: 30px;
  height: 30px;
  border-radius: 3px;
  overflow: hidden;
  opacity: 0.8;
`;
const Image = styled.Image.attrs(() => ({
  resizeMode: 'contain',
}))`
  ${imgStyle}
`;
const NoneImage = styled.View`
  ${imgStyle}
`;
