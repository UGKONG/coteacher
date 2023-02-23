import {useNavigation} from '@react-navigation/native';
import {useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {useLastTime} from '../functions/utils';

type Props = {
  title: string;
  line?: number;
  titleComponent?: () => JSX.Element | null;
  time?: Date;
  itemClick: () => void;
  itemLongClick?: () => void;
};

export default function Item({
  title,
  line = 1,
  titleComponent: TitleComponent,
  time,
  itemClick,
  itemLongClick,
}: Props) {
  const [isImageError, setIsImageError] = useState<boolean>(false);

  const imgURL = useMemo<string>(() => {
    let url = 'https://sanguk.gabia.io/img/';
    let result = url + title?.toLowerCase() + '.png';
    return result;
  }, []);

  return (
    <Container onPress={itemClick} onLongPress={itemLongClick}>
      <Wrap>
        {TitleComponent ? <TitleComponent /> : null}
        <Contents>
          <Name numberOfLines={line}>{title}</Name>
          {isImageError ? (
            <NoneImage />
          ) : (
            <Image
              source={{uri: imgURL}}
              onError={() => setIsImageError(true)}
            />
          )}
        </Contents>
        {time ? <TimeView>{useLastTime(time)}</TimeView> : null}
      </Wrap>
    </Container>
  );
}

const Container = styled.TouchableHighlight.attrs(() => ({
  activeOpacity: 0.7,
  underlayColor: '#EDEDED',
}))`
  border-bottom-color: #eee;
  border-bottom-width: 1px;
  min-height: 45px;
`;
const Wrap = styled.View`
  flex: 1;
  padding: 10px 15px;
`;
const Contents = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
const Name = styled.Text`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  color: #343434;
`;
const imgStyle = `
  min-width: 30px;
  max-width: 30px;
  min-height: 30px;
  max-height: 30px;
  border-radius: 3px;
  overflow: hidden;
  opacity: 0.8;
`;
const Image = styled.Image.attrs(() => ({
  resizeMode: 'contain',
}))`
  ${imgStyle}
`;
const NoneImage = styled.View`
  ${imgStyle}
`;
const TimeView = styled.Text`
  font-size: 10px;
  color: #999999;
  text-align: right;
  margin-top: 5px;
`;
