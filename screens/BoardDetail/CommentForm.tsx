import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useRef, useState} from 'react';
import {Alert, TextInput} from 'react-native';
import http from '../../functions/http';
import {useSelector} from 'react-redux';
import {Store} from '../../store/index.type';
import {errorMessage} from '../../public/strings';
import ButtonLoading from '../../layouts/ButtonLoading';

type Props = {id: number; getData: () => void};

export default function CommentForm({id, getData}: Props) {
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
      })
      .catch(() => Alert.alert('오류', errorMessage))
      .finally(() => setIsPending(false));
  };

  return (
    <Container>
      <Input ref={ref} value={value} onChangeText={setValue} />
      <Submit onPress={submit}>
        {isPending ? <ButtonLoading /> : <CheckIcon />}
      </Submit>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  padding: 5px;
`;
const Input = styled.TextInput.attrs(() => ({
  editable: true,
  multiline: true,
  placeholder: '댓글을 작성해주세요.',
  maxLength: 100,
}))`
  min-height: 30px;
  max-height: 200px;
  flex: 1;
  background-color: #f1f1f1;
  border-radius: 4px;
  padding: 10px;
  color: #343434;
  font-size: 12px;
`;
const Submit = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  flex: 1;
  max-width: 44px;
  min-height: 30px;
  max-height: 200px;
  border-radius: 4px;
  margin-left: 5px;
  justify-content: center;
  align-items: center;
  background-color: #20c75e;
`;
const CheckIcon = styled(Icon).attrs(() => ({
  name: 'checkmark-sharp',
}))`
  color: #ffffff;
  font-size: 20px;
`;
