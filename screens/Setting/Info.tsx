import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {useDate} from '../../functions/utils';
import {Store} from '../../store/index.type';

export default function Info() {
  const user = useSelector((x: Store) => x?.user);

  const time = useMemo<string | null>(() => {
    if (!user?.USER_VISIT_DT) return null;
    let result = useDate(new Date(user?.USER_VISIT_DT), true, {
      date: '.',
      time: ':',
    });
    return '최근접속 ' + result;
  }, [user?.USER_VISIT_DT]);

  return (
    <View>
      <Text>{time}</Text>
      <Text>코북 1.0.3 | 제공자 전상욱</Text>
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
