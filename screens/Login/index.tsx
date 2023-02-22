import styled from 'styled-components/native';
import {
  getProfile as getKakaoProfile,
  KakaoProfile,
  login,
} from '@react-native-seoul/kakao-login';
import _Container from '../../layouts/Container';
import http from '../../functions/http';
import logoImage from '../../assets/logo2.png';
import {Alert, Platform} from 'react-native';
import {useDispatch} from 'react-redux';

const os = Platform.OS;

export default function LoginScreen() {
  const dispatch = useDispatch();

  const errorCallback = (): void => {
    dispatch({type: 'user', payload: null});
    Alert.alert('경고', '서비스 상태가 원활하지 않습니다.');
  };

  const submit = (data: LoginData): void => {
    http
      .post('/login', data)
      .then(({data}) => {
        if (!data?.result) return errorCallback();
        dispatch({type: 'user', payload: data?.current});
      })
      .catch(errorCallback);
  };

  const kakaoLogin = (): void => {
    let platform: SnsPlatform = 'kakao';
    login()
      .then(() => {
        getKakaoProfile()
          .then((value: KakaoProfile) => {
            let id = value?.id || '';
            let name = value?.nickname || '';
            submit({id, name, platform, os});
          })
          .catch(errorCallback);
      })
      .catch(errorCallback);
  };

  return (
    <Container>
      <Logo source={logoImage} />
      <Description>서비스 이용을 위해 로그인을 해주세요.</Description>
      <SubmitBtn onPress={kakaoLogin}>
        <SubmitBtnText>카카오 로그인</SubmitBtnText>
      </SubmitBtn>
    </Container>
  );
}

const Container = styled(_Container.View)`
  padding-top: 100px;
  position: relative;
`;
const Logo = styled.Image.attrs(() => ({
  resizeMode: 'contain',
}))`
  width: 60%;
  max-width: 300px;
  height: 400px;
  margin: 100px 0 50px;
`;
const Description = styled.Text`
  color: #a7a7a7;
`;
const SubmitBtn = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  width: 90%;
  height: 40px;
  border-radius: 8px;
  background-color: #ecce0d;
  margin: 0 auto;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 5%;
`;
const SubmitBtnText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: 700;
`;
