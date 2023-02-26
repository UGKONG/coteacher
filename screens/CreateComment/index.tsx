import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useRef, useState} from 'react';
import {Alert, TextInput, Dimensions} from 'react-native';
import http from '../../functions/http';
import {useSelector} from 'react-redux';
import {Store} from '../../store/index.type';
import {errorMessage} from '../../public/strings';
import ButtonLoading from '../../layouts/ButtonLoading';
import Icon1 from 'react-native-vector-icons/Ionicons';
import _Container from '../../layouts/Container';

const {width, height} = Dimensions.get('screen');
type Props = {id: number; getData: () => void; close: () => void};

export default function CreateComment({id, getData, close}: Props) {
  const ref = useRef<TextInput>(null);
  const user = useSelector((x: Store) => x?.user);
  const [value, setValue] = useState<string>('');
  const [isPending, setIsPending] = useState<boolean>(false);

  const submit = (): void => {
    if (!value || !user) {
      if (ref.current) ref.current?.focus();
      return;
    }
    setIsPending(true);

    let form = {CMT_CN: value, USER_SQ: user?.USER_SQ};
    http
      .post('/comment/' + id, form)
      .then(({data}) => {
        if (!data?.result) return Alert.alert('오류', errorMessage);
        setValue('');
        getData();
        close();
      })
      .catch(() => Alert.alert('오류', errorMessage))
      .finally(() => setIsPending(false));
  };

  return (
    <Container>
      <Wrap>
        <CommentTitle>
          <CommentIcon />
          <CommentTitleText>댓글</CommentTitleText>
        </CommentTitle>
        <Input
          ref={ref}
          value={value}
          style={{maxHeight: height * 0.3}}
          onChangeText={setValue}
        />
        <ButtonContainer>
          <Submit onPress={submit}>
            {isPending ? <ButtonLoading /> : <CheckIcon />}
          </Submit>
          <CloseButton onPress={close}>
            <CloseIcon />
          </CloseButton>
        </ButtonContainer>
      </Wrap>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Wrap = styled.View`
  flex: 1;
  padding: 14px;
`;
const CommentTitle = styled.View`
  padding: 0 0 10px;
  align-items: center;
  flex-direction: row;
  position: relative;
  margin-bottom: 6px;
  width: 100%;
`;
const CommentIcon = styled(Icon1).attrs(() => ({
  name: 'chatbubble-ellipses-outline',
}))`
  font-size: 22px;
  margin-right: 5px;
`;
const CommentTitleText = styled.Text`
  color: #343434;
  letter-spacing: 2px;
  font-size: 17px;
  font-weight: 700;
`;
const Input = styled.TextInput.attrs(() => ({
  editable: true,
  multiline: true,
  placeholder: '댓글을 작성해주세요.',
  maxLength: 100,
}))`
  flex: 1;
  width: 100%;
  border: 1px solid #eee;
  background-color: #f1f1f1;
  border-radius: 4px;
  padding: 10px;
  color: #343434;
  font-size: 12px;
`;
const buttonStyle = `
  height: 100%;
  border-radius: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const ButtonContainer = styled.View`
  height: 44px;
  margin-top: 10px;
  flex-direction: row;
`;
const Submit = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  ${buttonStyle}
  margin-right: 10px;
  background-color: #20c75e;
`;
const CheckIcon = styled(Icon).attrs(() => ({
  name: 'checkmark-sharp',
}))`
  color: #ffffff;
  font-size: 20px;
`;
const CloseButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  ${buttonStyle}
  background-color: #f64d45;
`;
const CloseIcon = styled(Icon).attrs(() => ({
  name: 'close',
}))`
  color: #ffffff;
  font-size: 20px;
`;
