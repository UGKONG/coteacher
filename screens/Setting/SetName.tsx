import {useEffect, useRef, useState} from 'react';
import {Alert, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import http from '../../functions/http';
import ButtonLoading from '../../layouts/ButtonLoading';
import {errorMessage} from '../../public/strings';
import {Store} from '../../store/index.type';
import {
  CheckIcon,
  Container,
  Input,
  Name,
  Right,
  SubmitButton,
} from './index.style';

export default function SetName() {
  const dispatch = useDispatch();
  const inputRef = useRef<TextInput>();
  const user = useSelector((x: Store) => x?.user);
  const [name, setName] = useState<string>(user?.USER_NM ?? '');
  const [isPending, setIsPending] = useState<boolean>(false);

  const submit = (): void => {
    if (isPending) return;
    if (!name) {
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    setIsPending(true);

    const form = {USER_NM: name};
    http
      .put('/user/' + user?.USER_SQ, form)
      .then(({data}) => {
        if (!data?.result) return Alert.alert('오류', errorMessage);
        dispatch({type: 'user', payload: {...user, USER_NM: name}});
        if (inputRef.current) inputRef.current.blur();
      })
      .catch(() => Alert.alert('오류', errorMessage))
      .finally(() => setTimeout(() => setIsPending(false), 1000));
  };

  const getName = () => {
    setName(user?.USER_NM ?? '');
  };

  useEffect(getName, [user]);
  return (
    <Container>
      <Name>닉네임</Name>
      <Right>
        <Input
          placeholder="닉네임을 입력해주세요."
          defaultValue={name}
          onChangeText={setName}
        />
        <SubmitButton onPress={submit}>
          {isPending ? <ButtonLoading /> : <CheckIcon />}
        </SubmitButton>
      </Right>
    </Container>
  );
}
