import {Platform} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import titleImage from '../assets/title.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

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
`;
const SettingIcon = styled(Icon).attrs(() => ({
  name: 'ios-search-outline',
}))`
  font-size: 26px;
  color: #5d5d5d;
`;
