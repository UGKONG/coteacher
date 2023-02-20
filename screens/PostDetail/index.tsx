import Container from '../../layouts/Container';
import {useEffect, useState} from 'react';
import http from '../../functions/http';
import styled from 'styled-components/native';
import Editor from '../../layouts/Editor';

export default function PostDetailScreen({navigation, route}: any) {
  const POST_SQ = route?.params?.POST_SQ ?? 0;
  const LANG_NM = route?.params?.LANG_NM ?? '';
  const [data, setData] = useState<Post>();

  const getData = (): void => {
    if (!POST_SQ) return setData(undefined);

    http
      .get('/post/' + POST_SQ)
      .then(({data}) => {
        if (!data?.result) return setData(undefined);
        setData(data?.current);
        console.log(data?.current);
      })
      .catch(() => setData(undefined));
  };

  useEffect(() => {
    let title = data?.POST_TTL ?? '스킬 상세보기';
    if (title?.length > 15) {
      title = title?.slice(0, 15) + '..';
    }
    navigation.setOptions({title: title});
  }, [data]);
  useEffect(getData, [POST_SQ]);

  return (
    <Container.Scroll onRefresh={getData}>
      {data?.POST_CD ? (
        <Editor lang={LANG_NM} value={data?.POST_CD ?? ''} />
      ) : null}
      <Title>{data?.POST_TTL}</Title>
      <Contents>{data?.POST_CN}</Contents>
    </Container.Scroll>
  );
}

const Text = styled.Text`
  padding: 10px;
  white-space: pre-wrap;
`;
const Title = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  color: #333333;
`;
const Contents = styled(Text)`
  font-size: 14px;
  color: #343434;
`;
