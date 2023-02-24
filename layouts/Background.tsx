import {Dispatch, SetStateAction} from 'react';
import styled from 'styled-components/native';

type Props = {
  setImgView: Dispatch<SetStateAction<string | null>>;
};

export default function Background({setImgView}: Props) {
  return <Container onPress={() => setImgView(null)} />;
}

const Container = styled.TouchableOpacity.attrs(() => ({
  activeOpcity: 0.8,
}))`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: #00000000;
`;
