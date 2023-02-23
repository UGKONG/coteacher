import styled from 'styled-components/native';
import {colors} from '../public/strings';

type Props = {text: string};

export default function HeaderSubTitle({text = ''}: Props) {
  return <Text color={text}>{text}</Text>;
}

const Text = styled.Text<{color: string}>`
  font-size: 12px;
  color: ${x => colors[x?.color?.toLocaleLowerCase()] ?? '#555555'};
`;
