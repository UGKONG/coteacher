import axios from 'axios';
import {
  hangulIncludes,
  josa,
  chosungIncludes,
  disassembleHangul,
} from '@toss/hangul';
import {getDateDistance} from '@toss/date';
import {isEmail, isMobilePhone, isRRN} from '@toss/validators';
import {
  formatBusinessRegistrationNumber,
  ceilToUnit,
  commaizeNumber,
  chunk,
  delay,
  floorToUnit,
  getOSByUserAgent,
  isServer,
  isNonEmptyArray,
  isIE,
  formatToKRW,
  uniqBy,
  sum,
  QS,
  smoothScrollTo,
  roundToUnit,
  retryRequestsOf,
  range,
  shuffle,
  Masker,
  mapValues,
  generateID,
  maskName,
  clamp,
  minBy,
  loadScript,
  last,
  arrayIncludes,
  maxBy,
  sample,
} from '@toss/utils';

export type JosaWord =
  | '이/가'
  | '을/를'
  | '은/는'
  | '으로/로'
  | '와/과'
  | '이나/나'
  | '이에/에';
export type PlatformReturn = 'node' | 'ios' | 'android' | 'web' | 'other';
export type ScrollOption = {speed: number} | {duration: number};
export interface SuccessResponseData {
  now: string;
  result: boolean;
  current: any;
  message: 'success';
}
export interface FailResponseData {
  now: string;
  result: boolean;
  current: null;
  message: string | Error;
}
export interface AxiosResponse {
  data: SuccessResponseData | FailResponseData;
}
export interface dateTimeFormat {
  date: '-' | '/' | '.';
  time: ':' | '.' | '/';
}

const keyPositions = {
  ㅂ: 'q',
  ㅈ: 'w',
  ㄷ: 'e',
  ㄱ: 'r',
  ㅅ: 't',
  ㅛ: 'y',
  ㅕ: 'u',
  ㅑ: 'i',
  ㅐ: 'o',
  ㅔ: 'p',
  ㅁ: 'a',
  ㄴ: 's',
  ㅇ: 'd',
  ㄹ: 'f',
  ㅎ: 'g',
  ㅗ: 'h',
  ㅓ: 'j',
  ㅏ: 'k',
  ㅣ: 'l',
  ㅋ: 'z',
  ㅌ: 'x',
  ㅊ: 'c',
  ㅍ: 'v',
  ㅠ: 'b',
  ㅜ: 'n',
  ㅡ: 'm',
  q: 'ㅂ',
  w: 'ㅈ',
  e: 'ㄷ',
  r: 'ㄱ',
  t: 'ㅅ',
  y: 'ㅛ',
  u: 'ㅕ',
  i: 'ㅑ',
  o: 'ㅐ',
  p: 'ㅔ',
  a: 'ㅁ',
  s: 'ㄴ',
  d: 'ㅇ',
  f: 'ㄹ',
  g: 'ㅎ',
  h: 'ㅗ',
  j: 'ㅓ',
  k: 'ㅏ',
  l: 'ㅣ',
  z: 'ㅋ',
  x: 'ㅌ',
  c: 'ㅊ',
  v: 'ㅍ',
  b: 'ㅠ',
  n: 'ㅜ',
  m: 'ㅡ',
};

/**
 * @example
 * fail('에러입니다.');
 * @return
 * result: false,
 * message: "에러입니다."
 * current: null
 */
export const fail = (message: string | Error = 'Error'): FailResponseData => {
  console.log(message);
  return {
    now: useDate(),
    result: false,
    message: message,
    current: null,
  };
};

/**
 * @example
 * success('성공입니다.');
 * @return
 * result: true
 * message: "success"
 * current: "성공입니다."
 */
export const success = (data: any = null): SuccessResponseData => {
  return {
    now: useDate(),
    result: true,
    message: 'success',
    current: data,
  };
};

export const useAxios = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

/**
 * @example
 * useBirthValidate('980127');
 * // true
 * useBirthValidate('asdf');
 * // false
 * useBirthValidate('25.4');
 * // false
 */
export const useBirthValidate = (input: string): boolean => {
  return isEmail(input);
};

/**
 *
 * @example
 * useBusinessNumber('0000000000');
 * // '000-00-00000'
 */
export const useBusinessNumber = (number: string): string => {
  let result: string = formatBusinessRegistrationNumber(number);

  return result;
};

/**
 * @example
 * useCeil(16232, 3);
 * // 17000
 * useCeil(548642482, 8);
 * // 600000000
 * useCeil(123456, 4);
 * // 130,000
 */
export const useCeil = (
  number: number,
  zeroCount: number,
  isComma?: boolean,
): number | string => {
  let result: number = ceilToUnit(number, Math.pow(10, zeroCount));
  if (!isComma) return result;
  return commaizeNumber(result);
};

/**
 * @example
 * useChunkArray([1, 2, 3, 4], 1);
 * // [[1], [2], [3], [4]]
 * useChunkArray([1, 2, 3, 4, 5, 6], 3);
 * // [[1, 2, 3], [4, 5, 6]]
 * useChunkArray([1, 2, 3, 4, 5, 6, 7], 2);
 * // [[1, 2], [3, 4], [5, 6], [7]]
 * useChunkArray([], 2);
 * // []
 */
export const useChunkArray = (array: Array<any>, count: number): Array<any> => {
  return chunk(array, count);
};

/**
 * @example
 * useDate(new Date());
 * // 2022-10-16 14:30:10
 * useDate(new Date(), false);
 * // 2022-10-16
 * useDate(new Date(), true, { date: '.', time: '/'});
 * // 2022.10.16 14/30/10
 */
export const useDate = (
  date: Date = new Date(),
  isFull: boolean = true,
  format: dateTimeFormat = {date: '-', time: ':'},
): string => {
  let Y: string = String(date.getFullYear());
  let M: string = String(date.getMonth() + 1);
  M = M?.length < 2 ? '0' + M : M;
  let D: string = String(date.getDate());
  D = D?.length < 2 ? '0' + D : D;
  let dateString: string = `${Y}${format.date}${M}${format.date}${D}`;

  if (isFull) {
    let h: string = String(date.getHours());
    h = h?.length < 2 ? '0' + h : h;
    let m: string = String(date.getMinutes());
    m = m?.length < 2 ? '0' + m : m;
    let s: string = String(date.getSeconds());
    s = s?.length < 2 ? '0' + s : s;
    let timeString: string = `${h}${format.time}${m}${format.time}${s}`;

    return dateString + ' ' + timeString;
  }

  return dateString;
};

/**
 * @example
 * useDelay(3);
 * // 3초 뒤 실행
 */
export const useDelay = async (
  s: number,
  callback?: () => void,
): Promise<void> => {
  await delay(s * 1000);
  if (callback) callback();
};

/**
 * @example
 * useEmailValidate('sanguk@sanguk.kr');
 * // true
 * useEmailValidate('asdf');
 * // false
 */
export const useEmailValidate = (input: string): boolean => {
  return isEmail(input);
};

/**
 * @example
 * useFloor(16232, 3);
 * // 16000
 * useFloor(548642482, 8);
 * // 500000000
 * useFloor(123456, 4);
 * // 120,000
 */
export const useFloor = (
  number: number,
  zeroCount: number,
  isComma?: boolean,
): number | string => {
  let result: number = floorToUnit(number, Math.pow(10, zeroCount));

  if (!isComma) return result;

  return commaizeNumber(result);
};

/**
 * @returns node | ios | android | web | other
 */
export const useGetOs = (): PlatformReturn => {
  let agent = getOSByUserAgent();
  let result: PlatformReturn = agent ? agent : isServer() ? 'node' : 'other';
  return result;
};

/**
 * @example
 * useHangulJosa('샴푸', '이/가');
 * // 샴푸가
 * useHangulJosa('칫솔', '이/가');
 * // 칫솔이
 * useHangulJosa('바깥', '으로/로');
 * // 바깥으로
 */
export const useHangulJosa = (word: string, josaWord: JosaWord): string => {
  return josa(word, josaWord);
};

/**
 * @example
 * useIsEmptyArray([1, 2, 3]);
 * // false
 * useIsEmptyArray([]);
 * // true
 */
export const useIsEmptyArray = (array: Array<any>): boolean => {
  let result: boolean = isNonEmptyArray(array);
  return !result;
};

export const useIsIE = (): boolean => {
  let result = isIE();
  return result;
};

/**
 * @example
 * useIsInArray([1, 2, 3], 3);
 * // true
 * useIsInArray([1, 2, 3], 5);
 * // false
 */
export const useIsInArray = (
  array: Array<number | string>,
  item: number | string,
): boolean => {
  let result: boolean = arrayIncludes(array, item);
  return result;
};

/**
 * @example
 * useLastItem<number>([1, 2, 3]);
 * // 3
 * useLastItem<{id:number}>([{id: 1}, {id: 2}, {id: 3}]);
 * // {id: 3}
 * useLastItem([]);
 * // undefined
 */
export const useLastItem = <T = any>(array: Array<T>): T => {
  let result: any = last(array);
  return result;
};

/**
 * @example
 * useLoadScript('https://example.com/script.js');
 */
export const useLoadScript = async (source: string): Promise<void> => {
  await loadScript(source);
};

/**
 * @example
 * useMax([1, 2, 3, 4]);
 * // 4
 * useMax([{id: 1}, {id: 2}, {id: 3}], 'id');
 * // {id: 3}
 * useMax([{name: '가'}, {name: '나'}, {name: '다'}], 'name');
 * // {name: '다'}
 */
export const useMax = (array: Array<any>, property?: string): any => {
  let type = typeof array[0];
  if (type === 'undefined') return undefined;
  if (type === 'string' || type === 'number') {
    return maxBy(array, x => x);
  }
  if (property) return maxBy(array, item => item[property]);
  return undefined;
};

/**
 * @example
 * useMin([1, 2, 3, 4]);
 * // 1
 * useMin([{id: 1}, {id: 2}, {id: 3}], 'id');
 * // {id: 1}
 * useMin([{name: '가'}, {name: '나'}, {name: '다'}], 'name');
 * // {name: '가'}
 */
export const useMin = (array: Array<any>, property?: string): any => {
  let type = typeof array[0];
  if (type === 'undefined') return undefined;

  if (type === 'string' || type === 'number') {
    return minBy(array, x => x);
  }

  if (property) return minBy(array, item => item[property]);

  return undefined;
};

/**
 * @description
 * useMinMax (값, 최소값, 최대값);
 * @example
 * useMinMax(3, 1);
 * // 3
 * useMinMax(3, 1, 5);
 * // 3
 * useMinMax(3, 5);
 * // 5
 * useMinMax(7, 3, 5);
 * // 5
 */
export const useMinMax = (
  number: number,
  min: number,
  max?: number,
): number => {
  let result: any = clamp(number, min, max ?? min);

  return result;
};

/**
 * @example
 * useNameMask('전상욱');
 * // 전*욱
 */
export const useNameMask = (name: string, maskChar?: string): string => {
  return maskName(name, {maskChar: maskChar || '*'});
};

/**
 * @example
 * useNewId();
 * // 1
 * useNewId();
 * // 2
 * useNewId();
 * // 3
 */
export const useNewId = (): number => {
  return Number(generateID());
};

/**
 * @example
 * useNoop
 */
export const useNoop = (): void => {};

/**
 * @example
 * useObjectKeys({id: 1, name: '전상욱'});
 * // ['id', 'name']
 */
export const useObjectKeys = (object: any): Array<string> => {
  return Object.keys(object);
};

/**
 * @example
 * useObjectMap({ foo: 1, bar: 2 }, x => x * 2);
 * // { foo: 2, bar: 4 }
 */
export const useObjectMap = (object: any, callback: (x: any) => any): any => {
  return mapValues(object, callback);
};

/**
 * @example
 * useObjectValues({id: 1, name: '전상욱'});
 * // [1, '전상욱']
 */
export const useObjectValues = (object: any): Array<string> => {
  return Object.values(object);
};

/**
 * @param number1 loaded value
 * @param number2 all value
 * @example
 * usePercent(3, 10)
 * @return
 * 30
 */
export const usePercent = (number1?: number, number2?: number): number => {
  if (!number1) return 0;
  if (!number2) return 0;
  let result: number = (number1 / number2) * 100;
  return result;
};

/**
 * @example
 * usePhoneMask('010-1234-5678');
 * // 010-****-5678
 * usePhoneMask('01012345678');
 * // 010****5678
 */
export const usePhoneMask = (phoneNumber: string): string => {
  return Masker.maskPhoneNumber(phoneNumber);
};

/**
 * @example
 * usePhoneNumber('01025560000');
 * // '010-2556-0000'
 * usePhoneNumber('0215994905');
 * // '02-1599-4905'
 */
export const usePhoneNumber = (phoneNumber: string): string => {
  return phoneNumber
    .replace(/-/g, '')
    .replace(/[^0-9]/g, '')
    .replace(
      /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,
      '$1-$2-$3',
    )
    .replace('--', '-');
};

/**
 * @example
 * usePhoneValidate('01012341234');
 * // true
 * usePhoneValidate('010-1234-1234');
 * // true
 * usePhoneValidate('010123412');
 * // false
 * usePhoneValidate('asdf');
 * // false
 */
export const usePhoneValidate = (input: string): boolean => {
  return isMobilePhone(input);
};

/**
 * @example
 * useQueryString({id: 1, name: '전상욱'});
 * // ?id=1&name=전상욱
 * useQueryString({id: 1, language: ['js', 'ts']});
 * // ?id=1&language=js&language=ts
 */
export const useQueryString = (object: any): string => {
  return QS.create(object);
};

/**
 * @example
 * useQueryString('?id=1&name=전상욱');
 * // {id: 1, name: '전상욱'}
 * useQueryString('?animal=lion&animal=tiger');
 * // {animal: ['lion', 'tiger']}
 */
export const useQueryObject = (string: string): any => {
  let result: any = {};
  let value: string = string;
  if (string[0] === '?') value = value?.replace('?', '');

  let split: string[] = value?.split('&');
  let queryArray: string[] = [];

  split?.forEach(x => {
    if (x) queryArray.push(x);
  });

  queryArray?.forEach(x => {
    let [key, value] = x?.split('=')?.map(y => y ?? '');
    if (result[key] !== null && result[key] !== undefined) {
      if (typeof result[key] === 'object') {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  });

  return result;
};

/**
 * @example
 * useRandomArray([1, 2, 3, 4]);
 * // [4, 3, 1, 2]
 */
export const useRandomArray = (array: Array<any>): Array<any> => {
  return shuffle(array);
};

/**
 * @example
 * useRandomChoiceArray([1, 2, 3]);
 * // 3
 * useRandomChoiceArray([1, 2, 3]);
 * // 2
 * useRandomChoiceArray({ id: 1 }, { id: 2 }, { id: 3 });
 * // { id: 2 }
 * useRandomChoiceArray([]);
 * // undefined
 */
export const useRandomChoiceArray = (array: any[]): any => {
  let result: any = sample(array);

  return result;
};

/**
 * @example
 * useRandomNumber(2);
 * // '32'
 * useRandomNumber(3);
 * // '261'
 * useRandomNumber(4);
 * // '9423'
 * useRandomNumber(5);
 * // '22744'
 */
export const useRandomNumber = (num: number): string => {
  let result = '';
  for (let i = 0; i < num; i++) {
    let n = Math.round(Math.random() * 10);
    result += String(n);
  }
  return result;
};

/**
 * @example
 * useRange(1, 5);
 * // [1, 2, 3, 4]
 * useRange(4);
 * // [0, 1, 2, 3]
 * useRange(1, 11, 3);
 * // [1, 4, 7, 10]
 */
export const useRange = (
  start: number,
  end?: number,
  step?: number,
): Array<number> => {
  return range(start, end, step);
};

/**
 * @example
 * useRetry(() => {
 *   console.log('called');
 *   throw new Error('Failed');
 * }, 2, () => {
 *   console.log('Error!!')
 * });
 * // called
 * // Error!!
 * // called
 * // Error!!
 */
export const useRetry = (
  callback: any,
  retryCount?: number,
  errorCallback?: () => void,
): any => {
  let result = retryRequestsOf(callback, {
    retries: retryCount ?? 0,
    onError: errorCallback ?? (() => {}),
  });
  result();
  return result;
};

/**
 * @example
 * useRound(16232, 3);
 * // 16000
 * useRound(548642482, 8);
 * // 500000000
 * useRound(123456, 4);
 * // 120,000
 */
export const useRound = (
  number: number,
  zeroCount: number,
  isComma?: boolean,
): number | string => {
  let result: number = roundToUnit(number, Math.pow(10, zeroCount));

  if (!isComma) return result;

  return commaizeNumber(result);
};

export const useScrollTo = (
  element: Element | Window,
  to: number,
  option?: ScrollOption,
): void => {
  smoothScrollTo(element ?? window, {top: to ?? 0}, option);
};

/**
 * @example
 * useSearchHangul('개발자', '갭');
 * // true
 * useSearchHangul('개발자', '개발ㅈ');
 * // true
 * useSearchHangul('개발자', '개밪');
 * // false
 */
export const useSearchHangul = (
  current: string,
  searchText?: string,
): boolean => {
  let _current = current?.toLocaleLowerCase()?.replace(/ /g, '');
  let _searchText = (searchText ?? '')?.replace(/ /g, '');

  let bool1 = hangulIncludes(_current, _searchText);
  let bool2 = chosungIncludes(_current, _searchText);

  let txtArr: string[] = disassembleHangul(_searchText)?.split('');
  txtArr = txtArr?.map(x => keyPositions[x as keyof typeof keyPositions] ?? '');
  let join = txtArr?.join('');
  let bool3 = hangulIncludes(_current, join || _searchText);

  return bool1 || bool2 || bool3;
};

/**
 * @example
 * useStringQuery('id=1&name=전상욱');
 * // {id: 1, name: '전상욱'}
 * useStringQuery('?id=1&name=전상욱');
 * // {id: 1, name: '전상욱'}
 * useStringQuery('?id=1&language=js&language=ts');
 * // {id: 1, language: ['js', 'ts']}
 */
export const useStringQuery = (object: string): object => {
  return QS.parse(object);
};

/**
 * @example
 * useSum([1, 2, 3, 4]);
 * // 10
 */
export const useSum = (numberArray: Array<number>): number => {
  return sum(numberArray);
};

/**
 * @example
 * useUniqArray([1, 2, 3, 4]);
 * // 4
 * useUniqArray([{id: 1}, {id: 2}, {id: 3}], 'id');
 * // {id: 3}
 * useUniqArray([{name: '가'}, {name: '나'}, {name: '다'}], 'name');
 * // {name: '다'}
 */
export const useUniqArray = (
  array: Array<any>,
  property?: string,
): Array<any> => {
  let type = typeof array[0];
  if (type === 'undefined') return [];

  if (type === 'string' || type === 'number') {
    return uniqBy(array, x => x);
  }

  if (property) return uniqBy(array, x => x[property]);

  return [];
};

/**
 * @example
 * useUserSq('9801271234567');
 * // true
 * useUserSq('9801271234');
 * // false
 * useUserSq('asgsd');
 * // false
 */
export const useUserSq = (input: string): boolean => {
  return isRRN(input);
};

/**
 * @example
 * useWon(5685);
 * // 5,685원
 * useWon(13209802);
 * // 1,320만 9,802원
 */
export const useWon = (number: number): string => {
  let result: string = formatToKRW(number);

  return result;
};

/**
 * @example
 * useIsNumber('123');
 * // true
 * useIsNumber('abc');
 * // false
 * useIsNumber([1, '2', 3]);
 * // true
 * useIsNumber(['a', 2, 3]);
 * // false
 */
type UseIsNumberProps = number | string | number[] | string[];
export const useIsNumber = (input: UseIsNumberProps): boolean => {
  const isArray = Array.isArray(input);

  if (!isArray) {
    if (isNaN(Number(input))) return false;
  } else {
    for (let i = 0; i < input?.length; i++) {
      if (isNaN(Number(input[i]))) return false;
    }
  }

  return true;
};

/**
 * @example
 * useFileSize(244262);
 * // 238KB
 * useFileSize(12637356);
 * // 12MB
 * useFileSize(43737827845);
 * // 40GB
 * useFileSize(346347486545);
 * // 322GB
 */
export const useFileSize = (size?: number | null): string => {
  const units = ['KB', 'MB', 'GB', 'TB'];
  if (!size) return '0KB';

  for (let i = 0; i < units.length; i++) {
    size = Math.floor(size / 1024);
    if (size < 1024) {
      let fix = size.toFixed(1);
      if (fix?.slice(-2) === '.0') fix = fix?.slice(0, -2);
      return fix + units[i];
    }
  }
  return '0KB';
};

/**
 * @example
 * useLastTime(new Date('2023-01-01'));
 * // 4일전
 * useLastTime(new Date('2023-01-04'));
 * // 1일전
 * useLastTime(new Date('2023-01-05 12:30:43'));
 * // 4분전
 * useLastTime(new Date('2023-01-05 12:34:43'));
 * // 53초전
 */
export const useLastTime = (date: Date): string => {
  let test = getDateDistance(date, new Date());
  if (test?.days) return test?.days + '일전';
  if (test?.hours) return test?.hours + '시간전';
  if (test?.minutes) return test?.minutes + '분전';
  if (test?.seconds) return test?.seconds + '초전';
  return '';
};

/**
 * @example
 * useRandomColor();
 * // '#B19AC2'
 * useRandomColor();
 * // '#F06A59'
 * useRandomColor();
 * // '#558DEC'
 * useRandomColor();
 * // '#E49F59'
 */
export const useRandomColor = (): string => {
  let col = [
    '#47A1EB',
    '#8383E0',
    '#B19AC2',
    '#7D80AE',
    '#D07BA2',
    '#F06A59',
    '#13B374',
    '#0E8779',
    '#558DEC',
    '#E49F59',
  ];
  let num = Math.floor(Math.random() * 10);
  return col[num];
};
