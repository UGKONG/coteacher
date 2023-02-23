import {useState} from 'react';
import {RefreshControl} from 'react-native';
import styled from 'styled-components/native';

const Scroll = (props: any): JSX.Element => {
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  const fn = () => {
    setIsRefresh(true);
    setTimeout(() => setIsRefresh(false), 1000);
    if (props?.onRefresh) props?.onRefresh();
  };

  return (
    <ScrollContainer
      ref={props?.childRef}
      {...props}
      scrollEventThrottle={1}
      refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={fn} />}>
      {props?.children}
    </ScrollContainer>
  );
};

const View = (props: any): JSX.Element => {
  return <ViewContainer {...props}>{props?.children}</ViewContainer>;
};

const ScrollContainer = styled.ScrollView`
  width: 100%;
  flex: 1;
  position: relative;
  background-color: #fff;
`;
const ViewContainer = styled.SafeAreaView`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
  justify-content: flex-start;
  align-items: center;
`;
export default {Scroll, View};
