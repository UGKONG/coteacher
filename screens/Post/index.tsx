import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import Container from '../../layouts/Container';
import Item from '../../layouts/Item';
import http from '../../functions/http';
import Loading from '../../layouts/Loading';
import NoneItem from '../../layouts/NoneItem';
import HeaderSubTitle from '../../layouts/HeaderSubTitle';

export default function PostScreen({navigation, route}: any) {
  const isFocus = useIsFocused();
  const LANG_SQ = route?.params?.LANG_SQ ?? 0;
  const LANG_NM = route?.params?.LANG_NM ?? '';
  const [list, setList] = useState<Post[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(true);

  const getList = (): void => {
    http
      .get('/post?LANG_SQ=' + LANG_SQ)
      .then(({data}) => {
        if (!data?.result) return setList([]);
        setList(data?.current);
      })
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
      {isLoad ? (
        <Loading />
      ) : !list?.length ? (
        <NoneItem text="저장된 기술이 없습니다." />
      ) : (
        list?.map(item => (
          <Item
            key={item?.LANG_SQ}
            title={item?.POST_TTL}
            line={3}
            itemClick={() => {
              navigation.navigate('PostDetailScreen', {POST_SQ: item?.POST_SQ});
            }}
          />
        ))
      )}
    </Container.Scroll>
  );
}
