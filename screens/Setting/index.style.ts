import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

export const Container = styled.View`
  padding: 20px 15px;
  border-bottom-width: 1px;
  border-bottom-color: #eeeeee;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const Name = styled.Text`
  font-size: 15px;
  color: #343434;
  letter-spacing: 1px;
  margin-right: 15px;
`;
export const Right = styled.View`
  flex-direction: row;
`;
export const Input = styled.TextInput`
  font-size: 14px;
  height: 34px;
  flex: 1;
  background-color: #f1f1f1;
  border-radius: 4px;
  padding: 0 10px;
  min-width: 150px;
  max-width: 200px;
  letter-spacing: 1px;
  color: #343434;
`;
export const SubmitButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  width: 40px;
  height: 34px;
  border-radius: 4px;
  margin-left: 6px;
  justify-content: center;
  align-items: center;
  background-color: #20c75e;
`;
export const CheckIcon = styled(Icon).attrs(() => ({
  name: 'checkmark-sharp',
}))`
  color: #ffffff;
  font-size: 20px;
`;
