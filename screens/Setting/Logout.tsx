import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useMemo} from 'react';
import {Alert, AlertButton} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {Store} from '../../store/index.type';

export default function Logout() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((x: Store) => x?.user);

  const color = useMemo<string>(() => {
    let platform = user?.USER_SNS_NM;
    if (platform === 'kakao') return '#ecce0d';
    if (platform === 'naver') return '#17C85B';
    if (platform === 'apple') return '#343434';
    return '#555555';
  }, [user?.USER_SNS_NM]);

  const buttonText = useMemo<string>(() => {
    let platform = user?.USER_SNS_NM;
    if (!platform) return '로그아웃 완료';
    if (platform === 'kakao') return '카카오 로그아웃';
    if (platform === 'naver') return '네이버 로그아웃';
    if (platform === 'apple') return '애플 로그아웃';
    return '';
  }, [user?.USER_SNS_NM]);

  const logout = (): void => {
    let title = '알림';
    let text = '로그아웃 하시겠습니까?\n자동로그인이 해제됩니다.';
    let doit = () => {
      AsyncStorage.clear(() => {
        dispatch({type: 'user', payload: null});
        navigation.navigate('HomeScreen' as never);
      });
    };
    let buttons: AlertButton[] = [
      {text: '예', style: 'destructive', onPress: doit},
      {text: '아니요', style: 'cancel'},
    ];
    let options = {cancelable: true};
    Alert.alert(title, text, buttons, options);
  };

  return (
    <Button color={color} onPress={logout}>
      <ButtonText>{buttonText}</ButtonText>
    </Button>
  );
}

const Button = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))<{color: string}>`
  background-color: ${x => x?.color ?? '#555555'};
  max-height: 40px;
  min-height: 40px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin: 20px 10px 10px;
`;
const ButtonText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: 700;
`;
