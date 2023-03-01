import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import http from '../../functions/http';
import Container from '../../layouts/Container';
import Item from '../../layouts/Item';
import Loading from '../../layouts/Loading';
import NoneItem from '../../layouts/NoneItem';
import {Store} from '../../store/index.type';

export default function NoticeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((x: Store) => x?.user);
  const isFocus = useIsFocused();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [list, setList] = useState<MyComment[]>([]);

  const getList = (): void => {
    if (!user?.USER_SQ) return;

    http
      .get('/board/myComment/' + user?.USER_SQ)
      .then(({data}) => {
        if (!data?.result) return;
        setList(data?.current);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  const navigate = (screen: string, params: any): void => {
    navigation.navigate(screen as never, params as never);
  };

  useEffect(getList, [isFocus]);
  useEffect(() => {
    dispatch({type: 'isNoticeWatch', payload: true});
  }, []);

  return (
    <Container.Scroll>
      {isLoading ? (
        <Loading />
      ) : !list?.length ? (
        <NoneItem text="남겨진 댓글이 없습니다." />
      ) : (
        list?.map(item => {
          let cmt = item?.CMT_USER_NM + '님이 댓글을 남기셨습니다.';
          return (
            <Item
              key={item?.CMT_SQ}
              line={1}
              title={cmt}
              minHeight={82}
              time={new Date(item?.CMT_CRT_DT)}
              titleComponent={() => <Text>{item?.BD_CN}</Text>}
              itemClick={() => navigate('BoardDetailScreen', {...item})}
            />
          );
        })
      )}
    </Container.Scroll>
  );
}

const Text = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 12px;
  color: #555555;
`;
