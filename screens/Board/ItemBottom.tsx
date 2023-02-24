import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  view: number;
  comment: number;
};

export default function ItemBottom({view, comment}: Props) {
  return (
    <Bottom>
      <EyeIcon />
      <BottomText>{view ?? 0}</BottomText>
      <CommentIcon />
      <BottomText>{comment ?? 0}</BottomText>
    </Bottom>
  );
}

const Bottom = styled.View`
  flex-direction: row;
  padding: 0 14px;
  align-items: center;
  margin-bottom: 15px;
`;
const iconStyle = `
  color: #aaa;
  font-size: 20px;
  margin-right: 5px;
`;
const CommentIcon = styled(Icon).attrs(() => ({
  name: 'chatbubble-ellipses-outline',
}))`
  ${iconStyle}
`;
const EyeIcon = styled(Icon).attrs(() => ({
  name: 'eye-outline',
}))`
  ${iconStyle}
  font-size: 22px;
`;
const BottomText = styled.Text`
  margin-right: 20px;
  font-size: 12px;
  color: #aaa;
`;
