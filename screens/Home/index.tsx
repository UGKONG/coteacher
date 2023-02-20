/* eslint-disable react/react-in-jsx-scope */

import YoutubePlayer from 'react-native-youtube-iframe';

import {Text} from 'react-native';
import Container from '../../layouts/Container';

export default function HomeScreen() {
  return (
    <Container.Scroll>
      <Text>HOME</Text>
      <YoutubePlayer height={300} play={false} videoId={'iee2TATGMyI'} />
      <Text>dd</Text>
    </Container.Scroll>
  );
}
