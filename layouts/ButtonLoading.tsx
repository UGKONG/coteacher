import {ActivityIndicator} from 'react-native';

type Props = {color?: string};

export default function ButtonLoading({color = '#fff'}: Props) {
  return <ActivityIndicator size="small" color={color} />;
}
