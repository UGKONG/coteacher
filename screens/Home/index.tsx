import Container from '../../layouts/Container';
import Item from '../../layouts/Item';
import {useEffect, useMemo, useState} from 'react';
import http from '../../functions/http';
import Loading from '../../layouts/Loading';
import {useIsFocused} from '@react-navigation/native';
import NoneItem from '../../layouts/NoneItem';
import SearchBar from '../../layouts/SearchBar';
import {useSearchHangul} from '../../functions/utils';

export default function HomeScreen({navigation}: any) {
  const isFocus = useIsFocused();
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [list, setList] = useState<Language[]>([]);
  const [value, setValue] = useState<string>('');
  const [sort, setSort] = useState<boolean>(true);

  const searchList = useMemo<Language[]>(() => {
    let copy = [...list];

    if (sort) {
      copy = copy.sort((a, b) => (a?.LANG_NM < b?.LANG_NM ? -1 : 1));
    } else {
      copy = copy.sort((a, b) => (a?.LANG_NM > b?.LANG_NM ? -1 : 1));
    }

    if (!value) return copy;
    return copy?.filter(x => useSearchHangul(x?.LANG_NM, value));
  }, [list, value, sort]);

  const getList = (): void => {
    http
      .get('/language')
      .then(({data}) => setList(data?.result ? data?.current : []))
      .catch(() => {})
      .finally(() => setIsLoad(false));
  };

  useEffect(getList, [isFocus]);

  return (
    <Container.Scroll onRefresh={getList}>
      <SearchBar setValue={setValue} sort={sort} setSort={setSort} />
      {isLoad ? (
        <Loading />
      ) : value && !searchList?.length ? (
        <NoneItem text="검색된 언어가 없습니다." />
      ) : !searchList?.length ? (
        <NoneItem text="저장된 언어가 없습니다." />
      ) : (
        searchList?.map(item => (
          <Item
            key={item?.LANG_SQ}
            title={item?.LANG_NM?.toUpperCase()}
            itemClick={() => {
              navigation.navigate('PostScreen', item);
            }}
          />
        ))
      )}
    </Container.Scroll>
  );
}
