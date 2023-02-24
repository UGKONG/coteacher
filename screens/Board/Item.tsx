import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import styled from 'styled-components/native';
import ItemBottom from './ItemBottom';
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
        <MoreBtn>더보기</MoreBtn>
        <ItemTag tag={data?.BD_TAG} />
        <ItemBottom view={data?.BD_VIEW_CNT} comment={data?.BD_CMT_CNT} />
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
`;
const MoreBtn = styled.Text`
  font-size: 14px;
  color: #aaa;
  padding: 0 14px;
  margin-top: 4px;
  margin-bottom: 15px;
`;
const Margin = styled.View`
  height: 12px;
  margin-top: 10px;
  background-color: #f0f0f0;
`;
