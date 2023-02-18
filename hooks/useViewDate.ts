/* eslint-disable curly */
import {useMemo} from 'react';

type Memo = {
  full: string;
  date: string;
  time: string;
};

export default function useViewDate(currentDate: string) {
  const memo = useMemo<Memo>(() => {
    let full = '';
    let date = '';
    let time = '';

    if (!currentDate) return {full, date, time};

    let [_date, _time] = currentDate?.split(' ');
    let [Y, M, D] = _date?.split('-').map(x => Number(x));
    let [h, m] = _time?.split(':').map(x => Number(x));
    let txt = h < 12 ? '오전' : '오후';
    h = h < 12 ? h : h - 12;

    date = `${Y}.${M}.${D}.`;
    time = `${txt} ${h}:${m}`;
    full = `${date} ${time}`;

    return {full, date, time};
  }, [currentDate]);

  return memo;
}
