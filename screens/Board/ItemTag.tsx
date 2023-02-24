import {useMemo} from 'react';
import styled from 'styled-components/native';
import {currentTagList} from '../../public/strings';

type Props = {
  tag: string;
  itemPress?: (name: string) => void;
};

export default function ItemTag({tag, itemPress}: Props) {
  const tags = useMemo<string[]>(() => {
    if (!tag) return [];
    if (tag?.indexOf(',') === -1) return [tag];
    let result = tag?.split(',');
    result = result?.sort((a, b) => (a < b ? -1 : 1));
    result = result?.filter(x => x !== '');
    return result;
  }, [tag]);

  const onPress = (name: string): void => {
    (itemPress as (name: string) => void)(name);
  };

  return tags?.length ? (
    <Container>
      {tags?.map((item, i) => (
        <TagItem
          key={i}
          style={{
            backgroundColor:
              currentTagList[item as keyof typeof currentTagList],
          }}
          onPress={itemPress ? () => onPress(item) : undefined}>
          {item}
        </TagItem>
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
