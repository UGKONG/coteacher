import {useEffect, useMemo, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {Alert} from 'react-native';
import Container from '../../layouts/Container';
import http from '../../functions/http';
import Loading from '../../layouts/Loading';
import NoneItem from '../../layouts/NoneItem';
import SearchBar from '../../layouts/SearchBar';
import {useSearchHangul} from '../../functions/utils';
import Item from './Item';

export default function BoardScreen({navigation}: any) {
  const isFocus = useIsFocused();
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [list, setList] = useState<Board[]>([]);
  const [value, setValue] = useState<string>('');
  const [sort, setSort] = useState<boolean>(false);

  const searchList = useMemo<Board[]>(() => {
    let copy = [...list];

    if (sort) {
      copy = copy.sort((a, b) => (a?.BD_CRT_DT < b?.BD_CRT_DT ? -1 : 1));
    } else {
      copy = copy.sort((a, b) => (a?.BD_CRT_DT > b?.BD_CRT_DT ? -1 : 1));
    }

    if (!value) return copy;
    return copy?.filter(
      x =>
        useSearchHangul(x?.BD_TAG, value) || useSearchHangul(x?.BD_CN, value),
    );
  }, [list, value, sort]);

  const getList = (): void => {
    http
      .get('/board')
      .then(({data}) => setList(data?.result ? data?.current : []))
      .catch(() => setList([]))
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
        <NoneItem text="검색된 게시글이 없습니다." />
      ) : !searchList?.length ? (
        <NoneItem text="저장된 게시글이 없습니다." />
      ) : (
        searchList?.map(item => <Item key={item?.BD_SQ} data={item} />)
      )}
    </Container.Scroll>
  );
}
