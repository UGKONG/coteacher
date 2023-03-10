import {useEffect, useMemo, useState} from 'react';
import {Dimensions} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import styled from 'styled-components/native';
import CodeEditor, {
  CodeEditorSyntaxStyles,
} from '@rivascva/react-native-code-editor';
import Feather from 'react-native-vector-icons/Feather';
import {Languages} from '@rivascva/react-native-code-editor/lib/typescript/languages';

type Props = {
  value?: string;
  lang?: Languages;
  readOnly?: boolean;
  defaultHeight?: number;
};
type IconName = 'copy' | 'check';

const {width, height} = Dimensions.get('screen');

export default function Editor({
  value = '',
  lang = 'javascript',
  readOnly = true,
  defaultHeight,
}: Props) {
  const [iconName, setIconName] = useState<IconName>('copy');
  const [code, setCode] = useState<string>(value);

  const EditorHeight = useMemo<number>(() => {
    if (defaultHeight) return defaultHeight;
    return height / 2 - 100;
  }, [height, defaultHeight]);

  const copy = (): void => {
    if (iconName === 'check') return;
    Clipboard.setString(code);
    setIconName('check');
  };

  const reset = (): void => {
    if (iconName === 'copy') return;
    setTimeout(() => setIconName('copy'), 1500);
  };

  useEffect(reset, [iconName]);

  return (
    <Container style={{height: EditorHeight}}>
      <CodeEditor
        style={{
          fontSize: 16,
          inputLineHeight: 26,
          highlighterLineHeight: 26,
          width: width,
          height: EditorHeight,
        }}
        language={lang}
        syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
        showLineNumbers
        readOnly={readOnly}
        initialValue={code}
        onChange={setCode}
      />
      <CopyBtn onPress={copy}>
        <CopyIcon name={iconName} />
      </CopyBtn>
    </Container>
  );
}

const Container = styled.View`
  width: ${width}px;
  position: relative;
`;
const CopyBtn = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  background-color: #ffffff20;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  align-items: center;
  justify-content: center;
`;
const CopyIcon = styled(Feather)`
  color: #ffffffaa;
  font-size: 18px;
`;
