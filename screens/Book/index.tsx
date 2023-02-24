import Container from '../../layouts/Container';
import Item from '../../layouts/Item';
import {useEffect, useMemo, useState} from 'react';
import http from '../../functions/http';
import Loading from '../../layouts/Loading';
import styled from 'styled-components/native';
import {useIsFocused} from '@react-navigation/native';
import NoneItem from '../../layouts/NoneItem';
import {Alert} from 'react-native';
import {colors} from '../../public/strings';
import SearchBar from '../../layouts/SearchBar';
import {useSearchHangul} from '../../functions/utils';

export default function BookScreen({navigation}: any) {
  const isFocus = useIsFocused();
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [list, setList] = useState<(Book & Language & Post)[]>([]);
  const [value, setValue] = useState<string>('');
  const [sort, setSort] = useState<boolean>(true);

  const searchList = useMemo<(Book & Language & Post)[]>(() => {
    let copy = [...list];

    if (sort) {
      copy = copy.sort((a, b) => (a?.POST_TTL < b?.POST_TTL ? -1 : 1));
    } else {
      copy = copy.sort((a, b) => (a?.POST_TTL > b?.POST_TTL ? -1 : 1));
    }

    if (!value) return copy;
    return copy?.filter(
      x =>
        useSearchHangul(x?.LANG_NM, value) ||
        useSearchHangul(x?.POST_TTL, value),
    );
  }, [list, value, sort]);

  const getList = (): void => {
    http
      .get('/book?USER_SQ=1')
      .then(({data}) => setList(data?.result ? data?.current : []))
      .catch(() => {})
      .finally(() => setIsLoad(false));
  };

  const deleteBook = (BOOK_SQ: number): void => {
    http.delete('/book/' + BOOK_SQ).then(({data}) => {
      if (data?.result) getList();
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
      <SearchBar setValue={setValue} sort={sort} setSort={setSort} />
      {isLoad ? (
        <Loading />
      ) : value && !searchList?.length ? (
        <NoneItem text="검색된 북마크가 없습니다." />
      ) : !searchList?.length ? (
        <NoneItem text="저장된 북마크가 없습니다." />
      ) : (
        searchList?.map(item => (
          <Item
            key={item?.BOOK_SQ}
            title={item?.POST_TTL}
            line={3}
            titleComponent={() => (
              <TitleComponent color={item?.LANG_NM}>
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

const TitleComponent = styled.View<{color: string}>`
  background-color: ${x => colors[x?.color?.toLocaleLowerCase()] ?? '#ff8800'};
  margin: 5px 0 2px;
  padding: 4px 7px 5px;
  align-self: baseline;
`;
const TitleText = styled.Text`
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 1px;
  color: #fff;
`;
