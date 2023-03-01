import {Platform} from 'react-native';
import styled from 'styled-components/native';
import titleImage from '../assets/title.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {Store} from '../store/index.type';

const os = Platform.OS;

export const HeaderTitle = () => <HeaderTitleContainer source={titleImage} />;

export const HeaderRight = () => {
  const navigation = useNavigation();

  return (
    <SettingButton onPress={() => navigation.navigate('SearchScreen' as never)}>
      <SettingIcon />
    </SettingButton>
  );
};

export const HeaderNoticeIcon = () => {
  const navigation = useNavigation();
  const isNoticeWatch = useSelector((x: Store) => x?.isNoticeWatch);

  return (
    <SettingButton onPress={() => navigation.navigate('NoticeScreen' as never)}>
      <MessageIcon />
      {!isNoticeWatch && <Badge />}
    </SettingButton>
  );
};

const HeaderTitleContainer = styled.Image.attrs(() => ({
  resizeMode: 'contain',
}))`
  width: 80px;
  height: 34px;
  margin-bottom: ${os === 'android' ? '0px' : '5px'};
`;
const SettingButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const SettingIcon = styled(Icon).attrs(() => ({
  name: 'ios-search-outline',
}))`
  font-size: 26px;
  color: #5d5d5d;
`;
const MessageIcon = styled(AntDesign).attrs(() => ({
  name: 'message1',
}))`
  font-size: 24px;
  color: #5d5d5d;
`;
const Badge = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: #ff4444;
  top: 5px;
  right: 6px;
  position: absolute;
`;
