import {Dispatch, SetStateAction, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useLastTime} from '../../functions/utils';

type Size = 'large' | 'small';
type Props = {
  img: string;
  name: string;
  date: string;
  size?: Size;
  setImgView?: Dispatch<SetStateAction<string | null>>;
};

export default function ItemHeader({
  img,
  name,
  date,
  size = 'small',
  setImgView,
}: Props) {
  const [isImgErr, setIsImgErr] = useState<boolean>(false);

  const isImage = useMemo<boolean>(() => {
    if (!img || isImgErr) return false;
    return true;
  }, [isImgErr, img]);

  const imgPress = (): void => {
    if (!isImage) return;
    if (setImgView) setImgView(img);
  };

  return (
    <Container>
      <Profile activeOpacity={isImage ? 0.7 : 1} onPress={imgPress} size={size}>
        {isImage ? (
          <Image source={{uri: img}} onError={() => setIsImgErr(true)} />
        ) : (
          <NoneImage styled={imgStyle}>
            <PersonIcon />
          </NoneImage>
        )}
      </Profile>
      <ProfileInfo>
        <Name size={size}>{name ?? '이름없음'}</Name>
        <Time size={size}>{useLastTime(new Date(date))}</Time>
      </ProfileInfo>
    </Container>
  );
}

const Container = styled.View`
  padding: 14px;
  flex-direction: row;
`;
const imgStyle = `
  width: 44px;
  height: 44px;
  border-radius: 44px;
  border: 1px solid #f2f2f2;
  overflow: hidden;
`;
const Profile = styled.TouchableOpacity<{size: Size}>`
  ${imgStyle}
  margin-right: 14px;
  ${x =>
    x?.size === 'large'
      ? `
        width: 60px;
        height: 60px;
        border-radius: 60px;
      `
      : ''}
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
const ProfileInfo = styled.View`
  justify-content: space-around;
`;
const Name = styled.Text<{size: Size}>`
  font-size: 14px;
  font-weight: 700;
  color: #343434;
  ${x => (x?.size === 'large' ? 'font-size: 17px;' : '')}
`;
const Time = styled.Text<{size: Size}>`
  font-size: 11px;
  font-weight: 400;
  color: #777777;
  ${x => (x?.size === 'large' ? 'font-size: 12px;' : '')}
`;
