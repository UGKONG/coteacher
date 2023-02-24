import styled from 'styled-components/native';
import _Container from '../../layouts/Container';
import http from '../../functions/http';
import logoImage from '../../assets/logo2.png';
import {Alert, Platform, View, Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  getProfile as getKakaoProfile,
  KakaoProfile,
  login,
} from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {useEffect, useMemo, useState} from 'react';
import {errorMessage} from '../../public/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const iosKeys = {
  consumerKey: 'o3ice5GwsMQmJShhOxvO',
  consumerSecret: 'zvOX9PyTaV',
  appName: '코북',
  serviceUrlScheme: 'coteacher',
  disableNaverAppAuth: true,
};
const androidKeys = {
  consumerKey: 'o3ice5GwsMQmJShhOxvO',
  consumerSecret: 'zvOX9PyTaV',
  appName: '코북',
};

const {width: screenW, height: screenH} = Dimensions.get('screen');

const os = Platform.OS;
const naverLoginRequest = os === 'ios' ? iosKeys : androidKeys;

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [isAuto, setIsAuto] = useState<boolean>(false);
  const [isWarn, setIsWarn] = useState<boolean>(false);

  const imgSize = useMemo<{width: number; height: number}>(() => {
    let width = screenW * 0.6;
    let height = width * 2;
    return {width, height};
  }, [screenW, screenH]);

  const checkColor = useMemo<string>(
    () => (isAuto ? '#4aa09e' : '#aaa'),
    [isAuto],
  );

  const errorCallback = (): void => {
    dispatch({type: 'user', payload: null});
    Alert.alert('오류', errorMessage);
  };

  const submit = (data: LoginData): void => {
    http
      .post('/login', data)
      .then(({data}) => {
        if (!data?.result) return errorCallback();
        dispatch({type: 'user', payload: data?.current});

        if (isAuto) {
          let str = JSON.stringify(data?.current);
          AsyncStorage.setItem('user', str);
        }
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
            let img = value?.profileImageUrl || null;

            submit({id, name, img, platform, os});
          })
          .catch(errorCallback);
      })
      .catch(() => {});
  };

  const naverLogin = (): void => {
    let platform: SnsPlatform = 'naver';
    NaverLogin.login(naverLoginRequest)
      .then(({failureResponse, successResponse}) => {
        const token = successResponse?.accessToken;
        if (failureResponse || !token) {
          failureResponse && console.log(failureResponse);
          return;
        }

        NaverLogin.getProfile(token).then(({response}) => {
          let id: string = response?.id ?? '';
          let name: string = response?.name ?? '';
          let img = response?.profile_image || null;
          submit({id, name, img, platform, os});
        });
      })
      .catch(() => {});
  };

  const autoLoginCheck = (): void => {
    AsyncStorage.getItem('user').then(value => {
      if (!value) return;
      let json: User = JSON.parse(value);
      let id = json?.USER_SNS_SQ ?? null;
      let name = json?.USER_NM ?? null;
      let img = json?.USER_IMG ?? null;
      let platform = json?.USER_SNS_NM ?? null;

      if (!id || !name || !platform) return;

      submit({id, name, img, platform, os});
    });
  };

  const checkWarn = (): void => {
    if (!isAuto || isWarn) return;
    Alert.alert('경고', '본인의 기기에서만 체크해주세요.');
    setIsWarn(true);
  };

  useEffect(autoLoginCheck, []);
  useEffect(checkWarn, [isAuto]);

  return (
    <Container>
      <View />
      <Logo
        source={logoImage}
        style={{width: imgSize.width, height: imgSize.height}}
      />
      <ButtonContainer>
        <Description>서비스 이용을 위해 로그인을 해주세요.</Description>
        <CheckContainer onPress={() => setIsAuto(prev => !prev)}>
          <Checkbox style={{borderColor: checkColor}}>
            {isAuto && <Check />}
          </Checkbox>
          <Label
            style={{color: checkColor, fontWeight: isAuto ? '700' : '400'}}>
            자동로그인
          </Label>
        </CheckContainer>
        <SubmitBtn color="#17C85B" onPress={naverLogin}>
          <SubmitBtnText>네이버 로그인</SubmitBtnText>
        </SubmitBtn>
        <SubmitBtn color="#ecce0d" onPress={kakaoLogin}>
          <SubmitBtnText>카카오 로그인</SubmitBtnText>
        </SubmitBtn>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled(_Container.View)`
  position: relative;
  justify-content: space-between;
`;
const Logo = styled.ImageBackground.attrs(() => ({
  resizeMode: 'contain',
}))`
  max-width: 300px;
  margin: 10% 0 0;
`;
const Description = styled.Text`
  color: #a7a7a7;
  text-align: center;
  margin-bottom: 10px;
`;
const CheckContainer = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  margin: 10px 0;
`;
const Checkbox = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  margin-right: 5px;
  justify-content: center;
  align-items: center;
`;
const Check = styled.View`
  width: 73%;
  height: 73%;
  border-radius: 2px;
  background-color: #4aa09e;
`;
const Label = styled.Text`
  font-size: 13px;
`;
const ButtonContainer = styled.View`
  margin: 10px;
  flex: 1;
  align-self: stretch;
  justify-content: flex-end;
`;
const SubmitBtn = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))<{color: string}>`
  background-color: ${x => x?.color ?? '#555555'};
  max-height: 40px;
  min-height: 40px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
const SubmitBtnText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: 700;
`;
