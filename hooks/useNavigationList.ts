import {useMemo} from 'react';
import HomeStack from '../stacks/Home';
import BookStack from '../stacks/Book';
import BoardStack from '../stacks/Board';
import SettingStack from '../stacks/Setting';

type Memo = {
  id: number;
  name: string;
  title: string;
  icon: {default: string; focus: string; size: number};
  component: (props: any) => JSX.Element;
};

const icons = {
  home: ['code-slash-outline', 'code-slash'],
  book: ['bookmarks-outline', 'bookmarks'],
  board: ['chatbubbles-outline', 'chatbubbles-sharp'],
  setting: ['settings-outline', 'settings-sharp'],
};

export default function useNavigationList() {
  const memo = useMemo<Memo[]>(
    () => [
      {
        id: 1,
        name: 'Home',
        title: '홈',
        icon: {default: icons.home[0], focus: icons.home[1], size: 28},
        component: HomeStack,
      },
      {
        id: 2,
        name: 'Book',
        title: '북마크',
        icon: {default: icons.book[0], focus: icons.book[1], size: 21},
        component: BookStack,
      },
      {
        id: 3,
        name: 'Board',
        title: '게시판',
        icon: {default: icons.board[0], focus: icons.board[1], size: 23},
        component: BoardStack,
      },
      {
        id: 4,
        name: 'Setting',
        title: '설정',
        icon: {default: icons.setting[0], focus: icons.setting[1], size: 23},
        component: SettingStack,
      },
    ],
    [],
  );

  return memo;
}
