import {useMemo} from 'react';
import styled from 'styled-components/native';

type Props = {
  tag: string;
};

export default function ItemTag({tag}: Props) {
  const tags = useMemo<string[]>(() => {
    let replace = tag?.replace(/ /g, '');
    if (!replace) return [];
    if (replace?.indexOf(',') === -1) return [replace];
    let result = replace?.split(',');
    result = result?.filter((x, i) => x !== '' && i < 5);
    return result;
  }, [tag]);

  return tags?.length ? (
    <Container>
      {tags?.map((item, i) => (
        <TagItem key={i}>{item}</TagItem>
      ))}
    </Container>
  ) : null;
}

const Container = styled.View`
  flex-direction: row;
  margin: 10px 14px 10px;
  flex-wrap: wrap;
`;
const TagItem = styled.Text`
  background-color: #aaa;
  font-size: 10px;
  color: #fff;
  padding: 5px 6px;
  margin-right: 5px;
  margin-bottom: 5px;
`;
