import {useEffect, useMemo, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import Container from '../../layouts/Container';
import Item from '../../layouts/Item';
import http from '../../functions/http';
import Loading from '../../layouts/Loading';
import NoneItem from '../../layouts/NoneItem';
import HeaderSubTitle from '../../layouts/HeaderSubTitle';
import styled from 'styled-components/native';
import {colors} from '../../public/strings';
import SearchBar from '../../layouts/SearchBar';
import {useSearchHangul} from '../../functions/utils';

export default function PostScreen({navigation, route}: any) {
  const isFocus = useIsFocused();
  const LANG_SQ = route?.params?.LANG_SQ ?? 0;
  const LANG_NM = route?.params?.LANG_NM ?? '';
  const [list, setList] = useState<Post[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');
  const [sort, setSort] = useState<boolean>(true);

  const searchList = useMemo<Post[]>(() => {
    let copy = [...list];

    if (sort) {
      copy = copy.sort((a, b) => (a?.POST_TTL < b?.POST_TTL ? -1 : 1));
    } else {
      copy = copy.sort((a, b) => (a?.POST_TTL > b?.POST_TTL ? -1 : 1));
    }

    if (!value) return copy;
    return copy?.filter(x => useSearchHangul(x?.POST_TTL, value));
  }, [list, value, sort]);

  const getList = (): void => {
    http
      .get('/post?LANG_SQ=' + LANG_SQ)
      .then(({data}) => setList(data?.result ? data?.current : []))
      .catch(() => setList([]))
      .finally(() => setIsLoad(false));
  };

  const setOptions = (): void => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderSubTitle text={LANG_NM ? LANG_NM?.toUpperCase() : '-'} />
      ),
    });
  };

  useEffect(getList, [isFocus]);
  useEffect(setOptions, [navigation, route]);

  return (
    <Container.Scroll onRefresh={getList}>
      <SearchBar setValue={setValue} sort={sort} setSort={setSort} />
      {isLoad ? (
        <Loading />
      ) : value && !searchList?.length ? (
        <NoneItem text="검색된 항목이 없습니다." />
      ) : !searchList?.length ? (
        <NoneItem text="저장된 항목이 없습니다." />
      ) : (
        searchList?.map(item => (
          <Item
            key={item?.POST_SQ}
            title={item?.POST_TTL}
            line={3}
            titleComponent={() =>
              item?.POST_FRAMEWORK_NM ? (
                <FrameworkName color={item?.POST_FRAMEWORK_NM}>
                  {item?.POST_FRAMEWORK_NM}
                </FrameworkName>
              ) : null
            }
            time={new Date(item?.POST_CRT_DT)}
            itemClick={() => {
              navigation.navigate('PostDetailScreen', {POST_SQ: item?.POST_SQ});
            }}
          />
        ))
      )}
    </Container.Scroll>
  );
}

const FrameworkName = styled.Text<{color: string}>`
  color: ${x => colors[x?.color?.toLocaleLowerCase()] ?? '#555555'};
  align-self: baseline;
  padding: 2px 0;
  font-size: 12px;
`;
