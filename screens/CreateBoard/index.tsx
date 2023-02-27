import {useEffect, useMemo, useRef, useState} from 'react';
import _Container from '../../layouts/Container';
import http from '../../functions/http';
import styled from 'styled-components/native';
import {Alert, Dimensions, TextInput, Vibration} from 'react-native';
import {errorMessage} from '../../public/strings';
import {useSelector} from 'react-redux';
import {Store} from '../../store/index.type';
import ButtonLoading from '../../layouts/ButtonLoading';
import Modal from '../../layouts/Modal';
import TagScreen from '../Tag';
import ItemTag from '../Board/ItemTag';

const {width, height} = Dimensions.get('screen');

export default function CreateBoardScreen({navigation, route}: any) {
  const ref = useRef<TextInput>(null);
  const user = useSelector((x: Store) => x?.user);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isTag, setIsTag] = useState<boolean>(false);
  const [value, setValue] = useState<CreateBoard>({
    BD_CN: '',
    BD_TAG: '',
    USER_SQ: user?.USER_SQ ?? 0,
  });

  const tag = useMemo<string[]>(() => {
    let str = value?.BD_TAG;
    if (!str) return [];
    if (str?.indexOf(',') === -1) return [str];
    let arr = str?.split(',');
    arr = arr?.sort((a, b) => (a < b ? -1 : 1));
    return arr;
  }, [value?.BD_TAG]);

  const changeValue = (key: keyof CreateBoard, val: string): void => {
    setValue(prev => ({...prev, [key]: val}));
  };

  const submit = (): void => {
    setIsPending(true);

    http
      .post('/board', value)
      .then(({data}) => {
        if (!data?.result) {
          Vibration.vibrate();
          return Alert.alert('오류', errorMessage);
        }
        Alert.alert('게시글 등록', '등록되었습니다.');
        navigation.navigate('BoardScreen');
      })
      .catch(() => {
        Vibration.vibrate();
        return Alert.alert('오류', errorMessage);
      })
      .finally(() => setIsPending(false));
  };

  const tagDelete = (name: string) => {
    let filter = tag?.filter(x => x !== name);
    changeValue('BD_TAG', filter?.join(','));
  };

  const validate = (): void => {
    if (!value?.BD_CN) {
      if (ref.current) ref.current.focus();
      return;
    }
    submit();
  };

  const setOptions = (): void => {
    navigation.setOptions({
      headerRight: () => (
        <SubmitBtn onPress={validate}>
          {isPending ? (
            <ButtonLoading color="#00ada9" />
          ) : (
            <SubmitBtnText>저장</SubmitBtnText>
          )}
        </SubmitBtn>
      ),
    });
  };

  useEffect(setOptions, [navigation, route, isPending, value]);

  return (
    <>
      <Container>
        <Input
          ref={ref}
          style={{height: height * 0.2}}
          value={value?.BD_CN}
          onChangeText={val => changeValue('BD_CN', val)}
        />
        <ButtonContainer>
          <Button onPress={() => setIsTag(true)}>
            <ButtonText>태그 선택</ButtonText>
          </Button>
        </ButtonContainer>
        <ItemTag tag={value?.BD_TAG} itemPress={tagDelete} />
      </Container>

      {/* 태그 모달 */}
      <Modal visible={isTag}>
        <TagScreen
          tagList={tag}
          setTagString={str => changeValue('BD_TAG', str)}
          close={() => setIsTag(false)}
        />
      </Modal>
    </>
  );
}

const SubmitBtn = styled.TouchableOpacity`
  padding: 4px 0 4px 4px;
  align-items: center;
  justify-content: center;
`;
const SubmitBtnText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #00ada9;
`;
const Container = styled(_Container.Scroll)``;
const Input = styled.TextInput.attrs(() => ({
  numberOfLines: 10,
  placeholder: '내용을 입력해주세요.',
  editable: true,
  multiline: true,
  maxLength: 1000,
}))`
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 15px;
  line-height: 22px;
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  padding: 10px;
  margin: 10px 0 0;
`;
const Button = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8,
}))`
  padding: 7px 14px;
  border-radius: 100px;
  background-color: #14b1af;
`;
const ButtonText = styled.Text`
  color: #fff;
`;
