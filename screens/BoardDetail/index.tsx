import _Container from '../../layouts/Container';
import {useEffect, useMemo, useState} from 'react';
import http from '../../functions/http';
import styled from 'styled-components/native';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import ItemHeader from '../Board/ItemHeader';
import NoneItem from '../../layouts/NoneItem';
import CommentItem from './CommentItem';
import Background from '../../layouts/Background';
import ImageViewer from '../../layouts/ImageViewer';
import ItemBottom from '../Board/ItemBottom';
import ItemTag from '../Board/ItemTag';
import Loading from '../../layouts/Loading';
import HeaderIcon from 'react-native-vector-icons/SimpleLineIcons';
import {Alert, AlertButton} from 'react-native';
import {useSelector} from 'react-redux';
import {Store} from '../../store/index.type';
import {errorMessage} from '../../public/strings';
import Modal from '../../layouts/Modal';
import CreateComment from '../CreateComment';
import Icon2 from 'react-native-vector-icons/Entypo';

export default function BoardDetailScreen({navigation, route}: any) {
  const isFocus = useIsFocused();
  const data: Board | null = route?.params ?? null;
  const [list, setList] = useState<BoardComment[]>([]);
  const [isImgView, setImgView] = useState<string | null>(null);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const user = useSelector((x: Store) => x?.user);

  const isMyBoard = useMemo<boolean>(() => {
    return user?.USER_SQ === 1 || data?.USER_SQ === user?.USER_SQ;
  }, [data?.USER_SQ, user?.USER_SQ]);

  const init = (): void => {
    if (!data) navigation.navigate('BoardScreen');
  };

  const getData = (): void => {
    if (!data?.BD_SQ) return;
    http
      .get('/board/' + data?.BD_SQ)
      .then(({data}) => setList(data?.result ? data?.current : []))
      .catch(() => {})
      .finally(() => setIsLoad(false));
  };

  const deleteAsk = (): void => {
    let doit = (): void => {
      http
        .delete('/board/' + data?.BD_SQ)
        .then(({data}) => {
          if (!data?.result) return Alert.alert('오류', errorMessage);
          Alert.alert('삭제 완료', '게시글이 삭제되었습니다.');
          navigation.navigate('BoardScreen');
        })
        .catch(() => Alert.alert('오류', errorMessage));
    };

    let buttons: AlertButton[] = [
      {text: '예', style: 'destructive', onPress: doit},
      {text: '아니요'},
    ];
    Alert.alert('게시글 삭제', '해당 게시글을 삭제하시겠습니까?', buttons);
  };

  const setOptions = (): void => {
    navigation.setOptions({
      headerRight: () =>
        isMyBoard ? (
          <ModifyBtn onPress={deleteAsk}>
            <DelIcon />
          </ModifyBtn>
        ) : null,
    });
  };

  useEffect(getData, [data?.BD_SQ, isFocus]);
  useEffect(setOptions, [navigation, route, isMyBoard]);
  useEffect(init, []);

  return data ? (
    <>
      <Container onRefresh={getData}>
        <ItemHeader
          img={data?.USER_IMG}
          name={data?.USER_NM}
          date={data?.BD_CRT_DT}
          setImgView={setImgView}
          size="large"
        />
        <Contents>{data?.BD_CN}</Contents>
        <ItemTag tag={data?.BD_TAG} />
        <ItemBottom
          view={data?.BD_VIEW_CNT}
          comment={Math.max(data?.BD_CMT_CNT, list?.length)}
        />

        <Margin />

        <CommentTitle>
          <CommentIcon />
          <CommentTitleText>댓글</CommentTitleText>
          <CreateCommentBtn onPress={() => setIsCreate(true)}>
            <CreateCommentBtnIcon />
          </CreateCommentBtn>
        </CommentTitle>
        <Line />
        {isLoad ? (
          <Loading />
        ) : !list?.length ? (
          <NoneItem text="등록된 댓글이 없습니다." style={{height: 100}} />
        ) : (
          list?.map((item, i) => (
            <CommentItem
              key={item?.CMT_SQ}
              isLast={i === list?.length - 1}
              data={item}
              getData={getData}
            />
          ))
        )}
        <Margin style={{marginTop: 0, backgroundColor: '#fff'}} />
      </Container>

      {isImgView ? (
        <>
          <Background setImgView={setImgView} />
          <ImageViewer img={isImgView} />
        </>
      ) : null}

      <Modal visible={isCreate} style="overFullScreen">
        <CreateComment
          id={data?.BD_SQ}
          getData={getData}
          close={() => setIsCreate(false)}
        />
      </Modal>
    </>
  ) : null;
}

const Container = styled(_Container.Scroll)`
  padding-top: 14px;
`;
const Contents = styled.Text`
  font-size: 15px;
  margin-bottom: 30px;
  line-height: 22px;
  padding: 14px;
  color: #343434;
`;
const Margin = styled.View`
  height: 12px;
  background-color: #f0f0f0;
`;
const Line = styled.View`
  height: 1px;
  background-color: #eee;
`;
const CommentTitle = styled.View`
  padding: 14px;
  align-items: center;
  flex-direction: row;
  position: relative;
`;
const CommentIcon = styled(Icon1).attrs(() => ({
  name: 'chatbubble-ellipses-outline',
}))`
  font-size: 18px;
  margin-right: 5px;
`;
const CommentTitleText = styled.Text`
  color: #343434;
  letter-spacing: 2px;
  font-size: 17px;
  font-weight: 700;
`;
const iconStyle = `
  font-size: 20px;
  color: #999;
`;
const ModifyBtn = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8,
}))`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  margin-right: -5px;
`;
const DelIcon = styled(HeaderIcon).attrs(() => ({
  name: 'trash',
}))`
  ${iconStyle}
  color: #ff5656;
`;
const CreateCommentBtn = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8,
}))`
  padding: 7px 14px;
  position: absolute;
  right: 0;
`;
const CreateCommentBtnIcon = styled(Icon2).attrs(() => ({
  name: 'pencil',
}))`
  color: #839191;
  font-size: 22px;
`;
