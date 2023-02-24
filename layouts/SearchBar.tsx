import {Dispatch, SetStateAction, useMemo} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

type Props = {
  placeholder?: string;
  focus?: boolean;
  isSort?: boolean;
  sort?: boolean;
  setSort?: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<string>>;
};

const currentPlaceholder = '검색어를 입력해주세요.';

export default function SearchBar({
  placeholder = currentPlaceholder,
  focus = false,
  isSort = true,
  sort = true,
  setSort,
  setValue,
}: Props) {
  const iconName = useMemo<string>(() => {
    return sort ? 'sort-amount-down-alt' : 'sort-amount-up-alt';
  }, [sort]);

  return (
    <Container>
      <TextInput
        placeholder={placeholder}
        onChangeText={setValue}
        autoFocus={focus}
        keyboardType="default"
      />
      {isSort ? (
        <SortButton
          onPress={() => {
            if (setSort) setSort(prev => !prev);
          }}>
          <SortIcon name={iconName} />
        </SortButton>
      ) : null}
    </Container>
  );
}

const Container = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding: 10px;
`;
const TextInput = styled.TextInput`
  background-color: #f1f1f1;
  height: 36px;
  border-radius: 6px;
  padding: 0 10px;
  flex: 1;
`;
const SortButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  width: 40px;
  height: 36px;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  border-radius: 4px;
  margin-left: 6px;
`;
const SortIcon = styled(Icon)`
  color: #888888;
  font-size: 18px;
`;
