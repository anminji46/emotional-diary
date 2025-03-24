import emotion1 from './img/emotion1.png';
import emotion2 from './img/emotion2.png';
import emotion3 from './img/emotion3.png';
import emotion4 from './img/emotion4.png';
import emotion5 from './img/emotion5.png';
import emotion6 from './img/emotion6.png';
import emotion7 from './img/emotion7.png';
import emotion8 from './img/emotion8.png';
import emotion9 from './img/emotion9.png';
import emotion10 from './img/emotion10.png';

// 이미지를 불러오는 함수
export const getEmotionImgById = (emotionId) => {
  const targetEmotionId = String(emotionId);
  switch (targetEmotionId) {
    case "1" :
      return emotion1;
    case "2" :
      return emotion2;
    case "3" :
      return emotion3;
    case "4" :
      return emotion4;
    case "5" :
      return emotion5;
    case "6" :
      return emotion6;
    case "7" :
      return emotion7;
    case "8" :
      return emotion8;
    case "9" :
      return emotion9;
    case "10" :
      return emotion10;
    default :
    return null;
  }
}

// 날짜 입력 폼의 기본값을 오늘 날짜로 자동 설정
export const getFormattedDate = (targetDate) => {
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth()+1;
  let date = targetDate.getDate();
  if(month < 10) {
    month = `0${month}`;
  }
  return `${year}-${month}-${date}`
}

// 감정 이미지 렌더링
export const emotionList = [
  {
    id : 1,
    name: "멘탈나감",
    img : getEmotionImgById(1),
  },
  {
    id : 2,
    name : "골골",
    img : getEmotionImgById(2),
  },
  {
    id : 3,
    name : "현자 타임",
    img : getEmotionImgById(3),
  },
  {
    id : 4,
    name : "축하",
    img : getEmotionImgById(4),
  },
  {
    id : 5,
    name : "매우 화남",
    img : getEmotionImgById(5),
  },
  {
    id : 6,
    name : "화남",
    img : getEmotionImgById(6),
  },
  {
    id : 7,
    name : "good",
    img : getEmotionImgById(7),
  },
  {
    id : 8,
    name : "기분 나쁨",
    img : getEmotionImgById(8),
  },
  {
    id : 9,
    name : "슬픔",
    img : getEmotionImgById(9),
  },
  {
    id : 10,
    name : "사랑",
    img : getEmotionImgById(10),
  },
]

// pivotDate에 저장된 날짜에서 해당 월을 시작-끝 타임스탬프 구하기
export const getMonthRangeByDate = (date) => {
  const beginTimeStamp = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  const endTimeStamp = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();
  return { beginTimeStamp, endTimeStamp };
};

export const setPageTitle = (title) => {
  const titleElement = document.getElementsByTagName("title")[0];
  titleElement.innerText = title;
}