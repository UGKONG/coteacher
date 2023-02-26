import Container from '../../layouts/Container';
import Logout from './Logout';
import SetName from './SetName';
import Info from './Info';
import UserDelete from './UserDelete';

export default function SettingScreen() {
  return (
    <Container.Scroll>
      {/* 닉네임 변경 */}
      <SetName />

      {/* 로그아웃 */}
      <Logout />

      {/* 정보 */}
      <Info />

      {/* 회원탈퇴 */}
      <UserDelete />
    </Container.Scroll>
  );
}
