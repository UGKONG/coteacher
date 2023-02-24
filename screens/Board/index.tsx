import {useEffect, useMemo, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import Container from '../../layouts/Container';
import http from '../../functions/http';
import Loading from '../../layouts/Loading';
import NoneItem from '../../layouts/NoneItem';
import SearchBar from '../../layouts/SearchBar';
import {useSearchHangul} from '../../functions/utils';
import Item from './Item';
import CreateButton from '../../layouts/CreateButton';

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
    return copy?.filter(x => {
      let valid1 = useSearchHangul(x?.BD_TAG, value);
      let valid2 = useSearchHangul(x?.BD_CN, value);
      return valid1 || valid2;
    });
  }, [list, value, sort]);

  const getList = (): void => {
    http
      .get('/board')
      .then(({data}) => setList(data?.result ? data?.current : []))
      .catch(() => {})
      .finally(() => setIsLoad(false));
  };

  const createBoard = (): void => {
    navigation.navigate('CreateBoardScreen');
  };

  useEffect(getList, [isFocus]);

  return (
    <>
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

      <CreateButton onPress={createBoard} />
    </>
  );
}
