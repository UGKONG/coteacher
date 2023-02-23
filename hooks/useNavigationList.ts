import {useMemo} from 'react';
import BookStack from '../stacks/Book';
import HomeStack from '../stacks/Home';
import SettingStack from '../stacks/Setting';

type Memo = {
  id: number;
  name: string;
  title: string;
  icon: {default: string; focus: string};
  component: (props: any) => JSX.Element;
};

export default function useNavigationList() {
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
        name: 'Book',
        title: '북마크',
        icon: {default: 'ios-star-outline', focus: 'ios-star'},
        component: BookStack,
      },
      {
        id: 3,
        name: 'Setting',
        title: '설정',
        icon: {default: 'settings-outline', focus: 'settings-sharp'},
        component: SettingStack,
      },
    ],
    [],
  );

  return memo;
}
