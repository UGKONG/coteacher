import {ReactElement} from 'react';
import styled from 'styled-components/native';

type Props = {
  children?: ReactElement<any, any>;
  visible: boolean;
  style?: 'formSheet' | 'fullScreen' | 'pageSheet' | 'overFullScreen';
};
const Modal = ({children, visible, style}: Props): JSX.Element => {
  return (
    <Container visible={visible} presentationStyle={style ?? 'formSheet'}>
      <>{children ?? null}</>
    </Container>
  );
};

export default Modal;

const Container = styled.Modal.attrs(({visible}) => ({
  visible,
  animationType: 'slide',
}))``;
