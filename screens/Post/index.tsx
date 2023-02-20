import Container from '../../layouts/Container';
import Item from '../../layouts/Item';
import {useEffect, useState} from 'react';
import http from '../../functions/http';

export default function PostScreen({navigation, route}: any) {
  const LANG_SQ = route?.params?.LANG_SQ ?? 0;
  const LANG_NM = route?.params?.LANG_NM ?? '';
  const [list, setList] = useState<Post[]>([]);

  const getList = (): void => {
    http
      .get('/post?LANG_SQ=' + LANG_SQ)
      .then(({data}) => {
        if (!data?.result) return setList([]);
        setList(data?.current);
      })
      .catch(() => setList([]));
  };

  useEffect(getList, []);

  return (
    <Container.Scroll onRefresh={getList}>
      {list?.map(item => (
        <Item
          key={item?.LANG_SQ}
          title={item?.POST_TTL}
          itemClick={() => {
            navigation.navigate('PostDetailScreen', {
              POST_SQ: item?.POST_SQ,
              LANG_NM: LANG_NM,
            });
          }}
        />
      ))}
    </Container.Scroll>
  );
}
