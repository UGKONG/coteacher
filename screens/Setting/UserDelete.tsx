import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, AlertButton} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import http from '../../functions/http';
import {errorMessage} from '../../public/strings';
import {Store} from '../../store/index.type';

export default function UserDelete() {
  const dispatch = useDispatch();
  const user = useSelector((x: Store) => x?.user);

  const fail = (): void => {
    Alert.alert('오류', errorMessage);
  };

  const success = (): void => {
    AsyncStorage.clear(() => {
      Alert.alert('회원탈퇴', '탈퇴가 완료되었습니다.', [
        {
          text: '확인하였습니다.',
          onPress: () => {
            dispatch({type: 'user', payload: null});
          },
        },
      ]);
    }).catch(() => {});
  };

  const doit = (USER_SQ: number): void => {
    Alert.alert(
      '회원탈퇴',
      '정말 탈퇴하시겠습니까?',
      [
        {
          text: '예',
          style: 'destructive',
          onPress: () => {
            http
              .delete('/user/' + USER_SQ)
              .then(({data}) => {
                if (!data?.result) return fail();
                success();
              })
              .catch(fail);
          },
        },
        {text: '아니요'},
      ],
      {cancelable: true},
    );
  };

  const onPress = (): void => {
    if (!user?.USER_SQ || user?.USER_SQ === 1) {
      return Alert.alert('알림', '탈퇴를 진행할 수 없는 계정입니다.');
    }

    const buttons: AlertButton[] = [
      {text: '탈퇴', style: 'destructive', onPress: () => doit(user?.USER_SQ)},
      {text: '취소'},
    ];

    Alert.alert(
      '회원탈퇴',
      '회원탈퇴를 진행하시겠습니까?\n탈퇴 된 후에는 서비스 이용이 불가능합니다.',
      buttons,
      {cancelable: true},
    );
  };

  return (
    <Container onPress={onPress}>
      <Text>회원탈퇴</Text>
    </Container>
  );
}

const Container = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8,
}))`
  margin-top: 30px;
  align-items: center;
  align-self: center;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;
const Text = styled.Text`
  padding: 1px;
  font-size: 12px;
  color: #aaaaaa;
`;
