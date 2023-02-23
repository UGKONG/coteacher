import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemHeader from './ItemHeader';
import ItemTag from './ItemTag';

type Props = {
  data: Board;
};

export default function Item({data}: Props) {
  const navigation = useNavigation();

  const boardPress = (): void => {
    let screen = 'BoardDetailScreen' as never;
    navigation.navigate(screen, {...data} as never);
  };

  return (
    <Container onPress={boardPress}>
      <View>
        <ItemHeader
          img={data?.USER_IMG}
          name={data?.USER_NM}
          date={data?.BD_CRT_DT}
        />
        <Contents>{data?.BD_CN}</Contents>
        <ItemTag tag={data?.BD_TAG} />
        <Bottom>
          <EyeIcon />
          <BottomText>{data?.BD_VIEW_CNT ?? 0}</BottomText>
          <CommentIcon />
          <BottomText>{data?.BD_CMT_CNT ?? 0}</BottomText>
        </Bottom>
        <Margin />
      </View>
    </Container>
  );
}

const Container = styled.TouchableHighlight.attrs(() => ({
  underlayColor: '#f1f1f1',
}))``;
const Contents = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  padding: 0 14px 0;
  font-size: 14px;
  line-height: 18px;
  color: #232323;
  margin-bottom: 15px;
`;
const Margin = styled.View`
  height: 12px;
  margin-top: 10px;
  background-color: #f0f0f0;
`;
const Bottom = styled.View`
  flex-direction: row;
  padding: 0 14px;
  align-items: center;
`;
const iconStyle = `
  color: #aaa;
  font-size: 20px;
  margin-right: 5px;
`;
const CommentIcon = styled(Icon).attrs(() => ({
  name: 'chatbubble-ellipses-outline',
}))`
  ${iconStyle}
`;
const EyeIcon = styled(Icon).attrs(() => ({
  name: 'eye-outline',
}))`
  ${iconStyle}
  font-size: 22px;
`;
const BottomText = styled.Text`
  margin-right: 20px;
  font-size: 12px;
  color: #aaa;
`;
