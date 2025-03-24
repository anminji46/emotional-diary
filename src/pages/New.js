import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Button from "../component/Button";
import Editor from "../component/Editor";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import { setPageTitle } from "../util";

const New = () => {
  // 페이지 제목 변경
  useEffect(() => {
    setPageTitle("새 일기 쓰기");
  },[]);
  // 작성완료 버튼 구현
  const { onCreate } = useContext(DiaryDispatchContext);

  // 뒤로가기 버튼 구현
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  const onSubmit = (data) => {
    const { date, content, emotionId } = data;
    onCreate(date, content, emotionId);
    navigate("/", { replace : true });
  }

  return (
    <div>
      <Header 
        title={"새 일기 쓰기"}
        leftChild={<Button text={"< 뒤로가기"} onClick={goBack} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  )
};
export default New;