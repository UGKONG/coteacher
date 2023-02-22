import styled from 'styled-components/native';

type Props = {text: string};

export default function HeaderSubTitle({text = ''}: Props) {
  return <Text>{text}</Text>;
}

const Text = styled.Text`
  font-size: 12px;
  color: #555555;
`;
