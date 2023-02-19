import {useMemo} from 'react';
import HomeStack from '../stacks/Home';
import SettingStack from '../stacks/Setting';

type Memo = {
  id: number;
  name: string;
  title: string;
  icon: {default: string; focus: string};
  component: (props: any) => JSX.Element;
};

export default function useNavigation() {
  const memo = useMemo<Memo[]>(
    () => [
      {
        id: 1,
        name: 'Home',
        title: '홈',
        icon: {default: 'people-outline', focus: 'people-sharp'},
        component: HomeStack,
      },
      {
        id: 2,
        name: 'Setting',
        title: '설정',
        icon: {default: 'ios-construct-outline', focus: 'ios-construct'},
        component: SettingStack,
      },
    ],
    [],
  );

  return memo;
}