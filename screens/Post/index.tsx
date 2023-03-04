import {useEffect, useMemo, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import Container from '../../layouts/Container';
import Item from '../../layouts/Item';
import http from '../../functions/http';
import Loading from '../../layouts/Loading';
import NoneItem from '../../layouts/NoneItem';
import HeaderSubTitle from '../../layouts/HeaderSubTitle';
import styled from 'styled-components/native';
import {colors, errorMessage} from '../../public/strings';
import SearchBar from '../../layouts/SearchBar';
import {useSearchHangul} from '../../functions/utils';
import CreateButton from '../../layouts/CreateButton';
import CreatePostScreen from '../CreatePost';
import Modal from '../../layouts/Modal';
import {useSelector} from 'react-redux';
import {Store} from '../../store/index.type';
import {Alert, AlertButton, Vibration} from 'react-native';

export default function PostScreen({navigation, route}: any) {
  const isFocus = useIsFocused();
  const user = useSelector((x: Store) => x?.user);
  const LANG_SQ = route?.params?.LANG_SQ ?? 0;
  const LANG_NM = route?.params?.LANG_NM ?? '';
  const [list, setList] = useState<Post[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');
  const [sort, setSort] = useState<boolean>(true);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [modifySq, setModifySq] = useState<number>(0);

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
      .catch(() => {})
      .finally(() => setIsLoad(false));
  };

  const edit = (POST_SQ: number): void => {
    setModifySq(POST_SQ);
    setIsCreate(true);
  };

  const del = (POST_SQ: number): void => {
    http
      .delete('/post/' + POST_SQ)
      .then(({data}) => {
        if (!data?.result) {
          Vibration.vibrate();
          return Alert.alert('오류', errorMessage);
        }
        Alert.alert('삭제완료', '삭제되었습니다.');
        getList();
      })
      .catch(() => {
        Vibration.vibrate();
        return Alert.alert('오류', errorMessage);
      });
  };

  const modifyItem = (POST_SQ: number): void => {
    if (user?.USER_SQ !== 1) return;

    const buttons: AlertButton[] = [
      {text: '수정', onPress: () => edit(POST_SQ)},
      {text: '삭제', style: 'destructive', onPress: () => del(POST_SQ)},
      {text: '취소'},
    ];
    Alert.alert('항목수정', '항목을 수정하시겠습니까?', buttons);
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
    <>
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
              minHeight={68}
              time={new Date(item?.POST_CRT_DT)}
              itemClick={() => {
                navigation.navigate('PostDetailScreen', {
                  POST_SQ: item?.POST_SQ,
                });
              }}
              itemLongClick={() => modifyItem(item?.POST_SQ)}
            />
          ))
        )}
      </Container.Scroll>

      {user?.USER_SQ === 1 && (
        <>
          <CreateButton
            onPress={() => {
              setModifySq(0);
              setIsCreate(true);
            }}
          />

          <Modal visible={isCreate} style="overFullScreen">
            <CreatePostScreen
              modifySq={modifySq}
              getList={getList}
              lang={{sq: LANG_SQ, nm: LANG_NM}}
              close={() => setIsCreate(false)}
            />
          </Modal>
        </>
      )}
    </>
  );
}

const FrameworkName = styled.Text<{color: string}>`
  color: ${x => colors[x?.color?.toLocaleLowerCase()] ?? '#555555'};
  align-self: baseline;
  padding: 2px 0;
  font-size: 12px;
`;
