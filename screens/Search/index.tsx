import {useEffect, useMemo, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import Container from '../../layouts/Container';
import Item from '../../layouts/Item';
import http from '../../functions/http';
import Loading from '../../layouts/Loading';
import NoneItem from '../../layouts/NoneItem';
import styled from 'styled-components/native';
import {colors} from '../../public/strings';
import SearchBar from '../../layouts/SearchBar';
import {useSearchHangul} from '../../functions/utils';

export default function SearchScreen({navigation}: any) {
  const isFocus = useIsFocused();
  const [list, setList] = useState<(Post & Language)[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');
  const [sort, setSort] = useState<boolean>(true);

  const searchList = useMemo<(Post & Language)[]>(() => {
    let copy = [...list];

    if (sort) {
      copy = copy.sort((a, b) => (a?.POST_TTL < b?.POST_TTL ? -1 : 1));
    } else {
      copy = copy.sort((a, b) => (a?.POST_TTL > b?.POST_TTL ? -1 : 1));
    }

    if (!value) return [];
    return copy?.filter(
      x =>
        useSearchHangul(x?.LANG_NM, value) ||
        useSearchHangul(x?.POST_TTL, value),
    );
  }, [list, value, sort]);

  const getList = (): void => {
    http
      .get('/post')
      .then(({data}) => setList(data?.result ? data?.current : []))
      .catch(() => {})
      .finally(() => setIsLoad(false));
  };

  useEffect(getList, [isFocus]);

  return (
    <Container.Scroll onRefresh={getList}>
      <SearchBar
        setValue={setValue}
        focus={true}
        sort={sort}
        setSort={setSort}
        isSort={value && searchList?.length ? true : false}
      />
      {isLoad ? (
        <Loading />
      ) : !value ? (
        <NoneItem text="검색어를 입력해주세요." />
      ) : !searchList?.length ? (
        <NoneItem text="검색된 항목이 없습니다." />
      ) : (
        searchList?.map(item => (
          <Item
            key={item?.POST_SQ}
            title={item?.POST_TTL}
            line={3}
            titleComponent={() => (
              <TitleComponent color={item?.LANG_NM}>
                <TitleText>{item?.LANG_NM?.toUpperCase()}</TitleText>
              </TitleComponent>
            )}
            itemClick={() => {
              navigation.navigate('SearchDetailScreen', {
                POST_SQ: item?.POST_SQ,
              });
            }}
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
