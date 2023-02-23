import _Container from '../../layouts/Container';
import {useEffect, useMemo, useState} from 'react';
import http from '../../functions/http';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import ItemHeader from '../Board/ItemHeader';
import NoneItem from '../../layouts/NoneItem';
import CommentItem from './CommentItem';

export default function BoardDetailScreen({navigation, route}: any) {
  const isFocus = useIsFocused();
  const data: Board | null = route?.params ?? null;
  const [list, setList] = useState<BoardComment[]>([]);

  const init = (): void => {
    if (!data) navigation.navigate('BoardScreen');
  };

  const getData = (): void => {
    if (!data?.BD_SQ) return setList([]);
    http
      .get('/board/' + data?.BD_SQ)
      .then(({data}) => setList(data?.result ? data?.current : []))
      .catch(() => setList([]));
  };

  useEffect(getData, [data?.BD_SQ, isFocus]);
  useEffect(init, []);

  return data ? (
    <Container onRefresh={getData}>
      <ItemHeader
        img={data?.USER_IMG}
        name={data?.USER_NM}
        date={data?.BD_CRT_DT}
        size="large"
      />
      <Contents>{data?.BD_CN}</Contents>
      <Margin />
      <CommentTitle>
        <CommentIcon />
        <CommentTitleText>댓글</CommentTitleText>
      </CommentTitle>
      <Line />
      {!list?.length ? (
        <NoneItem text="등록된 댓글이 없습니다." style={{height: 50}} />
      ) : (
        list?.map(item => <CommentItem key={item?.CMT_SQ} data={item} />)
      )}
    </Container>
  ) : null;
}

const Container = styled(_Container.Scroll)`
  padding-top: 14px;
`;
const Contents = styled.Text`
  font-size: 15px;
  min-height: 150px;
  margin-bottom: 50px;
  line-height: 30px;
  padding: 14px;
  color: #343434;
`;
const Margin = styled.View`
  height: 12px;
  background-color: #f0f0f0;
`;
const Line = styled.View`
  height: 1px;
  background-color: #eee;
  margin-bottom: 10px;
`;
const CommentTitle = styled.View`
  padding: 14px;
  align-items: center;
  flex-direction: row;
`;
const CommentIcon = styled(Icon).attrs(() => ({
  name: 'chatbubble-ellipses-outline',
}))`
  font-size: 18px;
  margin-right: 5px;
`;
const CommentTitleText = styled.Text`
  color: #343434;
  letter-spacing: 2px;
  font-size: 17px;
  font-weight: 700;
`;
