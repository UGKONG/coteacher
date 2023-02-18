import {ReactElement} from 'react';
import styled from 'styled-components/native';

type Props = {children?: ReactElement<any, any>; visible: boolean};
const Modal = ({children, visible}: Props): JSX.Element => {
  return (
    <Container visible={visible}>
      <>{children ?? null}</>
    </Container>
  );
};

export default Modal;

const Container = styled.Modal.attrs(({visible}) => ({
  visible,
  animationType: 'slide',
  presentationStyle: 'formSheet',
}))``;
