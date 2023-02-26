import {useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {useLastTime} from '../../functions/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import {Alert, AlertButton} from 'react-native';
import http from '../../functions/http';
import {errorMessage} from '../../public/strings';
import {useSelector} from 'react-redux';
import {Store} from '../../store/index.type';

type Props = {isLast: boolean; data: BoardComment; getData: () => void};

export default function CommentItem({isLast, data, getData}: Props) {
  const user = useSelector((x: Store) => x?.user);
  const [isImgErr, setIsImgErr] = useState<boolean>(false);

  const isImage = useMemo<boolean>(() => {
    if (!data?.USER_IMG || isImgErr) return false;
    return true;
  }, [isImgErr, data?.USER_IMG]);

  const deleteComment = (): void => {
    if (user?.USER_SQ !== 1 && data?.USER_SQ !== user?.USER_SQ) return;

    let doit = (): void => {
      http.delete('/comment/' + data?.CMT_SQ).then(({data}) => {
        if (!data?.result) return Alert.alert('오류', errorMessage);
        getData();
      });
    };
    let buttons: AlertButton[] = [
      {text: '예', style: 'destructive', onPress: doit},
      {text: '아니요'},
    ];
    Alert.alert('댓글 삭제', '해당 댓글을 삭제하시겠습니까?', buttons);
  };

  return (
    <Container
      style={{marginBottom: isLast ? 10 : 0}}
      onLongPress={deleteComment}>
      <Wrap>
        <Profile>
          {isImage ? (
            <Image
              source={{uri: data?.USER_IMG}}
              onError={() => setIsImgErr(true)}
            />
          ) : (
            <NoneImage styled={imgStyle}>
              <PersonIcon />
            </NoneImage>
          )}
        </Profile>
        <TextContainer>
          <Name>{data?.USER_NM ?? '이름없음'}</Name>
          <Time>{useLastTime(new Date(data?.CMT_CRT_DT)) || '방금전'}</Time>
          <Contents>{data?.CMT_CN}</Contents>
        </TextContainer>
      </Wrap>
    </Container>
  );
}

const Container = styled.TouchableHighlight.attrs(() => ({
  activeOpacity: 0.8,
  underlayColor: '#f1f1f1',
}))`
  padding: 16px 14px 6px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  min-height: 80px;
`;
const Wrap = styled.View`
  flex-direction: row;
  flex: 1;
`;
const Contents = styled.Text`
  margin-bottom: 5px;
  color: #232323;
  font-size: 14px;
  line-height: 22px;
`;
const Name = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: #343434;
`;
const Time = styled.Text`
  font-size: 10px;
  color: #555555;
  margin-bottom: 5px;
`;
const imgStyle = `
  width: 44px;
  height: 44px;
  border-radius: 44px;
  border: 1px solid #f2f2f2;
  overflow: hidden;
`;
const Profile = styled.View`
  ${imgStyle}
  margin-right: 14px;
`;
const Image = styled.Image.attrs(() => ({
  resizeMode: 'contain',
}))`
  width: 100%;
  height: 100%;
`;
const NoneImage = styled.View<{styled: string}>`
  ${x => x?.styled}
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
`;
const PersonIcon = styled(Icon).attrs(() => ({
  name: 'person',
}))`
  color: #999999;
  font-size: 38px;
  margin-bottom: -5px;
`;
const TextContainer = styled.View`
  flex: 1;
`;
