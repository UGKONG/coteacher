import {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import http from '../../functions/http';
import {useDate} from '../../functions/utils';
import {version} from '../../public/strings';
import {Store} from '../../store/index.type';

export default function Info() {
  const user = useSelector((x: Store) => x?.user);
  const [list, setList] = useState<User[]>([]);

  const count = useMemo<number>(() => {
    if (!list?.length) return 0;
    return list?.length;
  }, [list]);

  const getList = (): void => {
    http
      .get('/user')
      .then(({data}) => setList(data?.result ? data?.current : []))
      .catch(() => setList([]));
  };

  const time = useMemo<string | null>(() => {
    if (!user?.USER_VISIT_DT) return null;
    let result = useDate(new Date(user?.USER_VISIT_DT), true, {
      date: '.',
      time: ':',
    });
    return '최근접속 ' + result;
  }, [user?.USER_VISIT_DT]);

  useEffect(getList, []);

  return (
    <View>
      <Text>{time}</Text>
      <Text>
        코북 {version} | 회원수 {count}명
      </Text>
      <Text>제공자 전상욱</Text>
    </View>
  );
}

const View = styled.View`
  margin-top: 20px;
`;
const Text = styled.Text`
  text-align: center;
  color: #aaa;
  font-size: 12px;
`;
