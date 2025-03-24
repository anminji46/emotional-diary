import React from 'react';
import './Button.scss';

function Button({ text, type, onClick }) {
  // type에 따라 다른 스타일 적용
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button 
    className={['Button', `Button_${btnType}`].join(" ")} 
    onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.defalutProps = {
  type : "default",
}

export default Button;
