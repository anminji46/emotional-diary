import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [diary, setDiary] = useState();

  // 일치하는 데이터가 없을 시 home으로 되돌리기
  const navigate = useNavigate();

  useEffect(() => {
    const matchDiary = data.find((it) => String(it.id) === String(id));
    if(matchDiary) {
      setDiary(matchDiary);
    } else {
      alert("일기가 존재하지 않아요ㅠㅜ");
      navigate("/home", { replace: true });
    }
  }, [id, data]);

  return diary;
};

export default useDiary;