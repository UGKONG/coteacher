import Container from '../../layouts/Container';
import {useEffect, useMemo, useState} from 'react';
import http from '../../functions/http';
import styled from 'styled-components/native';
import Editor from '../../layouts/Editor';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Dimensions} from 'react-native';
import {Languages} from '@rivascva/react-native-code-editor/lib/typescript/languages';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

export default function PostDetailScreen({navigation, route}: any) {
  const isFocus = useIsFocused();
  const POST_SQ = route?.params?.POST_SQ ?? 0;
  const [data, setData] = useState<Post & Language & Book & {IS_BOOK: 0 | 1}>();

  const videoSize = useMemo<{width: number; height: number}>(() => {
    let width = screenWidth;
    let height = width * 0.57099;
    return {width, height};
  }, [screenWidth, screenHeight]);

  const getData = (): void => {
    if (!POST_SQ) return setData(undefined);
    http
      .get('/post/' + POST_SQ + '?USER_SQ=1')
      .then(({data}) => {
        if (!data?.result) return setData(undefined);
        setData(data?.current);
      })
      .catch(() => setData(undefined));
  };

  const addBook = (): void => {
    const form = {USER_SQ: 1, POST_SQ: data?.POST_SQ};
    http.post('/book', form).then(({data}) => {
      if (!data?.result) return;
      getData();
    });
  };

  const deleteBook = (): void => {
    http.delete('/book/' + data?.BOOK_SQ).then(({data}) => {
      if (!data?.result) return;
      getData();
    });
  };

  const setOptions = (): void => {
    let title = data?.LANG_NM ? data?.LANG_NM?.toUpperCase() : '-';

    navigation.setOptions({
      title,
      headerRight: () => (
        <SaveButton onPress={data?.IS_BOOK ? deleteBook : addBook}>
          <Icon name={data?.IS_BOOK ? 'star' : 'staro'} />
        </SaveButton>
      ),
    });
  };

  useEffect(setOptions, [data]);
  useEffect(getData, [POST_SQ, isFocus]);

  return (
    <Container.Scroll onRefresh={getData}>
      {data?.POST_CD ? (
        <Editor lang={data?.LANG_NM as Languages} value={data?.POST_CD ?? ''} />
      ) : null}

      {/* 제목 */}
      <Title>{data?.POST_TTL}</Title>

      {/* 내용 */}
      <Contents>{data?.POST_CN}</Contents>

      {/* 영상 */}
      {data?.POST_VIDEO_SQ ? (
        <>
          <Title>참고영상</Title>
          <YoutubePlayer
            width={videoSize.width}
            height={videoSize.height}
            videoId={data?.POST_VIDEO_SQ}
          />
        </>
      ) : null}
    </Container.Scroll>
  );
}

const Text = styled.Text`
  padding: 10px;
  color: #343434;
`;
const Title = styled(Text)`
  font-size: 18px;
  font-weight: 700;
`;
const Contents = styled(Text)`
  font-size: 14px;
  min-height: 150px;
  margin-bottom: 50px;
`;
const SaveButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))``;
const Icon = styled(AntDesign)`
  font-size: 20px;
  color: #00ada9;
`;
