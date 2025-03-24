import React, { useCallback, useEffect, useState } from 'react';
import { emotionList, getFormattedDate } from '../util';
import Button from './Button';
import './Editor.scss';
import { useNavigate } from 'react-router-dom';
import EmotionItem from './EmotionItem';

function Editor({ initData, onSubmit }) {
  // 취소하기 버튼 구현하기
  const navigate = useNavigate();
    // 버튼 클릭 시 뒤로가기 이벤트 동작
  const handleOnGoBack = () => {
    navigate(-1);
  }
  // 날짜 입력 섹션 구현하기
  const [state, setState] = useState({
    date: getFormattedDate(new Date()),
    emotionId: 3,
    content: "",
  });
    // 날짜 변경 시 실행할 이벤트핸들러
  const handleChangeDate =(e) => {
    setState({
      ...state,
      date : e.target.value,
    });
  };
  // 일기 입력 섹션 구현하기
  const handlChangeContent = (e) => {
    setState({
      ...state,
      content: e.target.value,
    })
  }
  const handleSubmit = () => {
    onSubmit(state);
  }
  // 감정이미지 클릭 시 호출 이벤트핸들러
  // 선택한 감정이미지 번호를 매개변수(emotionId)에 저장 -> 현재 state의 emotionId값을 업데이트트
  const handleChangeEmotion = useCallback((emotionId) => {
    setState((state) => ({
      ...state,
      emotionId,
    }));
  }, []);
  // Home에서 받은 initData를 state의 기본값으로 설정
  useEffect(()=>{
    if(initData) {
      setState({
        ...initData,
        date : getFormattedDate(new Date(parseInt(initData.date))),
      });
    }
  },[initData]);

  return (
    <div className='Editor'>
      <div className='editor_section'>
        <h4>오늘의 날짜</h4>
        <div className='input_wrapper'>
          <input 
            type='date' value={state.date}
            onChange = {handleChangeDate}
          />
        </div>
      </div>
      <div className='editor_section'>
        <h4>오늘의 감정</h4>
        <div className='input_wrapper emotion_list_wrapper'>
          {emotionList.map((it)=>(
            <EmotionItem 
              key={it.id}
              {...it}
              onClick={handleChangeEmotion}
              isSelected={state.emotionId === it.id}
            />
          ))}
        </div>
      </div>
      <div className='editor_section'>
        <h4>오늘의 일기</h4>
        <div className='input_wrapper'>
          <textarea
            placeholder='오늘 하루는 어땠나요?'
            value={state.content}
            onChange={handlChangeContent}
          />
        </div>
      </div>
      <div className='editor_section bottom_section'>
        <Button text={"취소하기"} onClick={handleOnGoBack} />
        <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit} />
      </div>
    </div>
  )
};

export default Editor;
