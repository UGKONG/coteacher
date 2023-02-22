import Container from '../../layouts/Container';
import Item from '../../layouts/Item';
import {useEffect, useState} from 'react';
import http from '../../functions/http';
import Loading from '../../layouts/Loading';
import styled from 'styled-components/native';
import {useIsFocused} from '@react-navigation/native';
import NoneItem from '../../layouts/NoneItem';
import {Alert} from 'react-native';

export default function BookScreen({navigation}: any) {
  const isFocus = useIsFocused();
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [list, setList] = useState<(Book & Language & Post)[]>([]);

  const getList = (): void => {
    http
      .get('/book?USER_SQ=1')
      .then(({data}) => {
        if (!data?.result) return setList([]);
        setList(data?.current);
      })
      .catch(() => {
        setList([]);
      })
      .finally(() => setIsLoad(false));
  };

  const deleteBook = (BOOK_SQ: number): void => {
    http.delete('/book/' + BOOK_SQ).then(({data}) => {
      if (!data?.result) return;
      getList();
    });
  };

  const deleteAsk = (BOOK_SQ: number): void => {
    Alert.alert('북마크', '북마크에서 삭제하시겠습니까?', [
      {text: '예', onPress: () => deleteBook(BOOK_SQ)},
      {text: '아니요'},
    ]);
  };

  useEffect(getList, [isFocus]);

  return (
    <Container.Scroll onRefresh={getList}>
      {isLoad ? (
        <Loading />
      ) : !list?.length ? (
        <NoneItem text="저장된 북마크가 없습니다." />
      ) : (
        list?.map(item => (
          <Item
            key={item?.BOOK_SQ}
            title={item?.POST_TTL}
            line={3}
            titleComponent={() => (
              <TitleComponent>
                <TitleText>{item?.LANG_NM?.toUpperCase()}</TitleText>
              </TitleComponent>
            )}
            itemClick={() => {
              navigation.navigate('BookDetailScreen', {POST_SQ: item?.POST_SQ});
            }}
            itemLongClick={() => deleteAsk(item?.BOOK_SQ)}
          />
        ))
      )}
    </Container.Scroll>
  );
}

const TitleComponent = styled.View`
  background-color: #ff8800;
  margin: 5px 0 2px;
  padding: 4px 7px 5px;
  align-self: baseline;
`;
const TitleText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  color: #fff;
`;
