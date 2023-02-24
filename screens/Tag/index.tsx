import {Alert} from 'react-native';
import styled from 'styled-components/native';
import _Container from '../../layouts/Container';
import {currentTagList as _currentTagList} from '../../public/strings';

const currentTagList = _currentTagList?.sort((a, b) => {
  return a.toLocaleLowerCase() < b.toLocaleLowerCase() ? -1 : 1;
});

type Props = {
  tagList: string[];
  setTagString: (str: string) => void;
  close: () => void;
};

export default function TagScreen({tagList, setTagString, close}: Props) {
  const onPress = (name: string): void => {
    let find = tagList?.indexOf(name) > -1;
    let arr: string[] = [];

    if (find) {
      arr = tagList?.filter(x => x !== name);
    } else {
      if (tagList?.length >= 5) {
        return Alert.alert('태그 선택', '태그는 5개 이하로 선택 가능합니다.');
      }
      arr = [...new Set([...tagList, name])];
    }

    setTagString(arr?.join(','));
  };

  const color = (name: string): string => {
    let isFind = tagList?.indexOf(name) > -1;
    return isFind ? '#00ada9' : '#cccccc';
  };

  return (
    <Container>
      <Header>
        <Title>태그 선택</Title>
        <CloseBtn onPress={close}>
          <CloseBtnText>닫기</CloseBtnText>
        </CloseBtn>
      </Header>
      <List>
        <Wrpa>
          {currentTagList?.map(item => (
            <Item
              key={item}
              style={{backgroundColor: color(item)}}
              onPress={() => onPress(item)}>
              <ItemText>{item}</ItemText>
            </Item>
          ))}
        </Wrpa>
      </List>
    </Container>
  );
}

const Container = styled(_Container.View)``;
const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  width: 100%;
`;
const Title = styled.Text`
  color: #343434;
  font-size: 20px;
  font-weight: 700;
`;
const CloseBtn = styled.TouchableOpacity`
  padding: 10px;
`;
const CloseBtnText = styled.Text`
  color: #777777;
  font-size: 16px;
  font-weight: 700;
`;
const List = styled.ScrollView`
  width: 100%;
`;
const Wrpa = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
`;
const Item = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8,
}))`
  padding: 7px 14px;
  border-radius: 100px;
  background-color: #cccccc;
  margin-right: 10px;
  margin-bottom: 10px;
`;
const ItemText = styled.Text`
  color: #fff;
`;
