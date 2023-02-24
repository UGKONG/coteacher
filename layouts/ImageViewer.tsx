import {useMemo, useState} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

type Props = {img: string};

const {width, height} = Dimensions.get('screen');

export default function ImageViewer({img}: Props) {
  const [isError, setIsError] = useState<boolean>(false);

  const style = useMemo(
    () => ({
      width: width,
      height: width,
      top: height / 2 - width / 2 - 100,
    }),
    [Dimensions],
  );

  return isError ? null : (
    <Container
      source={{uri: img}}
      style={style}
      onError={() => setIsError(true)}
    />
  );
}

const Container = styled.ImageBackground.attrs(() => ({
  resizeMode: 'contain',
}))`
  z-index: 2;
  position: absolute;
  left: 0;
  background-color: #00000030;
`;
