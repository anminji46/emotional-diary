import React from 'react';
import './EmotionItem.scss';

function EmotionItem({ id, img, name, onClick, isSelected }) {
  // 감정이미지 클릭 시 id 저장 함수
  const handleOnClick = () => {
    onClick(id);
  }

  return (
    <div 
      className={[
        'EmotionItem',
        isSelected ? `EmotionItem_on` : `EmotionItem_off`,
      ].join(" ")}
      onClick={handleOnClick}>
      <img alt={`emotion$(id)`} src={img} />
      <span>{name}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
