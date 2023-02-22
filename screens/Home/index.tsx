import Container from '../../layouts/Container';
import Item from '../../layouts/Item';
import {useEffect, useState} from 'react';
import http from '../../functions/http';
import Loading from '../../layouts/Loading';
import {useIsFocused} from '@react-navigation/native';
import NoneItem from '../../layouts/NoneItem';

export default function HomeScreen({navigation}: any) {
  const isFocus = useIsFocused();
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [list, setList] = useState<Language[]>([]);

  const getList = (): void => {
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

  useEffect(getList, [isFocus]);

  return (
    <Container.Scroll onRefresh={getList}>
      {isLoad ? (
        <Loading />
      ) : !list?.length ? (
        <NoneItem text="저장된 언어가 없습니다." />
      ) : (
        list?.map(item => (
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
