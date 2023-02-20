import Container from '../../layouts/Container';
import Item from '../../layouts/Item';
import {useEffect, useState} from 'react';
import http from '../../functions/http';
import Loading from '../../layouts/Loading';

export default function HomeScreen({navigation}: any) {
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [list, setList] = useState<Language[]>([]);

  const getList = (): void => {
    setIsLoad(true);

    http
      .get('/language')
      .then(({data}) => {
        if (!data?.result) return setList([]);
        setList(data?.current);
      })
      .catch(() => {
        setList([]);
      })
      .finally(() => setIsLoad(false));
  };

  useEffect(getList, []);

  return (
    <Container.Scroll onRefresh={getList}>
      {isLoad ? (
        <Loading />
      ) : (
        list?.map(item => (
          <Item
            key={item?.LANG_SQ}
            title={item?.LANG_NM}
            itemClick={() => {
              navigation.navigate('PostScreen', {
                LANG_SQ: item?.LANG_SQ,
                LANG_NM: item?.LANG_NM,
              });
            }}
          />
        ))
      )}
    </Container.Scroll>
  );
}
