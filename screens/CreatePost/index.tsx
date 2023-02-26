import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useRef, useState} from 'react';
import {Alert, TextInput, Dimensions} from 'react-native';
import http from '../../functions/http';
import {useSelector} from 'react-redux';
import {Store} from '../../store/index.type';
import {colors, errorMessage} from '../../public/strings';
import ButtonLoading from '../../layouts/ButtonLoading';
import Icon1 from 'react-native-vector-icons/Ionicons';
import _Container from '../../layouts/Container';

const {height} = Dimensions.get('screen');
type Props = {
  getList: () => void;
  lang: {sq: number; nm: string};
  close: () => void;
};

export default function CreatePostScreen({getList, lang, close}: Props) {
  const titleRef = useRef<TextInput>(null);
  const contentsRef = useRef<TextInput>(null);
  const codeRef = useRef<TextInput>(null);
  const user = useSelector((x: Store) => x?.user);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [value, setValue] = useState({
    LANG_SQ: lang?.sq,
    POST_TTL: '',
    POST_CN: '',
    POST_CD: '',
  });

  const submit = (): void => {
    if (!value.POST_CN || !user) {
      if (contentsRef.current) contentsRef.current?.focus();
      return;
    }
    setIsPending(true);

    http
      .post('/post', value)
      .then(({data}) => {
        if (!data?.result) return Alert.alert('오류', errorMessage);
        getList();
        close();
      })
      .catch(() => Alert.alert('오류', errorMessage))
      .finally(() => setIsPending(false));
  };

  const changeValue = (key: keyof typeof value, val: string): void => {
    setValue(prev => ({...prev, [key]: val}));
  };

  return (
    <Container>
      <Wrap>
        <CommentTitle>
          <CommentIcon />
          <CommentTitleText>게시글 작성</CommentTitleText>
          <LangText style={{color: colors[lang.nm.toLowerCase()] ?? '#777777'}}>
            {lang.nm.toUpperCase()}
          </LangText>
        </CommentTitle>
        <Row>
          <RowTitle>제목</RowTitle>
          <Input
            ref={titleRef}
            value={value.POST_TTL ?? ''}
            style={{height: 34}}
            placeholder="제목을 작성해주세요."
            onChangeText={val => changeValue('POST_TTL', val)}
          />
        </Row>
        <Row>
          <RowTitle>내용</RowTitle>
          <Input
            ref={contentsRef}
            value={value.POST_CN ?? ''}
            style={{height: height * 0.13}}
            placeholder="내용을 작성해주세요."
            onChangeText={val => changeValue('POST_CN', val)}
          />
        </Row>
        <Row>
          <RowTitle>코드</RowTitle>
          <Input
            ref={codeRef}
            value={value.POST_CD ?? ''}
            style={{height: height * 0.15}}
            placeholder="코드를 작성해주세요. (선택입력)"
            onChangeText={val => changeValue('POST_CD', val)}
          />
        </Row>
        <ButtonContainer>
          <Submit onPress={submit}>
            {isPending ? <ButtonLoading /> : <CheckIcon />}
          </Submit>
          <CloseButton onPress={close}>
            <CloseIcon />
          </CloseButton>
        </ButtonContainer>
      </Wrap>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Wrap = styled.View`
  flex: 1;
  padding: 14px;
`;
const CommentTitle = styled.View`
  padding: 0 0 10px;
  align-items: center;
  flex-direction: row;
  position: relative;
  margin-bottom: 6px;
  width: 100%;
`;
const CommentIcon = styled(Icon1).attrs(() => ({
  name: 'chatbubble-ellipses-outline',
}))`
  font-size: 22px;
  margin-right: 5px;
`;
const CommentTitleText = styled.Text`
  color: #343434;
  letter-spacing: 2px;
  font-size: 17px;
  font-weight: 700;
`;
const LangText = styled.Text`
  color: #777777;
  position: absolute;
  right: 10px;
  top: 2px;
`;
const Input = styled.TextInput.attrs(() => ({
  editable: true,
  multiline: true,
  maxLength: 100,
}))`
  flex: 1;
  width: 100%;
  min-height: 34px;
  border: 1px solid #eee;
  background-color: #f1f1f1;
  border-radius: 4px;
  padding: 10px;
  color: #343434;
  font-size: 12px;
`;
const buttonStyle = `
  height: 100%;
  border-radius: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const ButtonContainer = styled.View`
  height: 44px;
  margin-top: 10px;
  flex-direction: row;
`;
const Submit = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  ${buttonStyle}
  margin-right: 10px;
  background-color: #20c75e;
`;
const CheckIcon = styled(Icon).attrs(() => ({
  name: 'checkmark-sharp',
}))`
  color: #ffffff;
  font-size: 20px;
`;
const CloseButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  ${buttonStyle}
  background-color: #f64d45;
`;
const CloseIcon = styled(Icon).attrs(() => ({
  name: 'close',
}))`
  color: #ffffff;
  font-size: 20px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 10px;
`;
const RowTitle = styled.Text`
  font-size: 14px;
  padding-top: 8px;
  color: #232323;
  margin-right: 10px;
  letter-spacing: 4px;
`;
