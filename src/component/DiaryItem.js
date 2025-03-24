import React from "react";
import { useNavigate } from 'react-router-dom';
import './DiaryItem.scss';
import { getEmotionImgById } from '../util';
import Button from './Button';

const DiaryItem = ({ id, emotionId, content, date }) => {
  // 이미지 섹션 만들기
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  
  // 수정하기 버튼 구현하기
  const goEdit = () => {
    navigate(`/edit/${id}`);
  }

  return <div className='DiaryItem'>
    <div
      onClick={goDetail}
      className={"img_section"}
    >
      <img alt={`emotion${emotionId}`} src={getEmotionImgById(emotionId)} />
    </div>
    <div onClick={goDetail} className='info_section'>
      <div className='date_wrapper'>
        {new Date(parseInt(date)).toLocaleDateString()}
      </div>
      <div className='content_wrapper'>{content.slice(0, 25)}</div>
    </div>
    <div className='button_section'>
      <Button onClick={goEdit} text={"수정하기"} />
    </div>
  </div>
}

export default React.memo(DiaryItem);