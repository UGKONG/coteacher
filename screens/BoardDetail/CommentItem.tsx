import {useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {useLastTime} from '../../functions/utils';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  data: BoardComment;
};

export default function CommentItem({data}: Props) {
  const [isImgErr, setIsImgErr] = useState<boolean>(false);

  const isImage = useMemo<boolean>(() => {
    if (!data?.USER_IMG || isImgErr) return false;
    return true;
  }, [isImgErr, data?.USER_IMG]);

  const imgPress = (): void => {
    if (!isImage) return;
  };

  return (
    <Container>
      <Profile activeOpacity={isImage ? 0.7 : 1} onPress={imgPress}>
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
        <Time>{useLastTime(new Date(data?.CMT_CRT_DT))}</Time>
        <Contents>{data?.CMT_CN}</Contents>
      </TextContainer>
    </Container>
  );
}

const Container = styled.View`
  padding: 6px 14px;
  margin-bottom: 20px;
  flex-direction: row;
`;
const Contents = styled.Text`
  margin-bottom: 5px;
  color: #232323;
  font-size: 14px;
  line-height: 22px;
`;
const Time = styled.Text`
  font-size: 10px;
  color: #555555;
  margin-bottom: 10px;
`;
const imgStyle = `
  width: 44px;
  height: 44px;
  border-radius: 44px;
  border: 1px solid #f2f2f2;
  overflow: hidden;
`;
const Profile = styled.TouchableOpacity`
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
`;
const PersonIcon = styled(Icon).attrs(() => ({
  name: 'person',
}))`
  color: #999999;
  font-size: 28px;
`;
const TextContainer = styled.View`
  flex: 1;
`;
