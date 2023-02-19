/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */

import CodeEditor, {
  CodeEditorSyntaxStyles,
} from '@rivascva/react-native-code-editor';

type Props = {
  value?: string;
  lang?: Languages;
};

export default function Editor({value = '', lang = 'javascript'}: Props) {
  return (
    <CodeEditor
      style={{
        fontSize: 16,
        inputLineHeight: 26,
        highlighterLineHeight: 26,
      }}
      language={lang}
      syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
      showLineNumbers
      readOnly
      initialValue={value}
    />
  );
}
