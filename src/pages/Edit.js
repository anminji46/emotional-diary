import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Header from "../component/Header";
import Button from "../component/Button";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import Editor from "../component/Editor";
import { setPageTitle } from "../util";

const Edit = () => {
  // URL파라미터로 일기 데이터 가져오기기
  const { id } = useParams();
  const data = useDiary(id);

  // 페이지 이름 변경
  useEffect(() => {
    setPageTitle(`${id}번 일기 수정하기`);
}, []);

  // 뒤로가기 버튼 구현하기
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  // 삭제하기, 작성완료 버튼 구현하기
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
    // 작성완료
  const onSubmit = (data) => {
    if(window.confirm("일기 수정을 끝마쳤나요?")) {
      const { date, content, emotionId } = data;
      onUpdate(id, date, content, emotionId);
      navigate("/home", { replace : true });
    }
  };
    // 삭제하기
  const onClickDelete = () => {
    if(window.confirm("일기를 정말 삭제할까요? 다시 복구할 수 없어요!ㅜㅜ")) {
      onDelete(id);
      navigate("/home", { replace : true });
    }
  };

  if (!data) {
    return <div>일기를 불러오고 있습니다..</div>;
  } else {
    return (
      <div>
        <Header 
          title={"일기 수정하기"}
          leftChild={<Button text={"< 뒤로가기"} onClick={goBack} />}
          rightChild={<Button type={"navigative"} text={"삭제하기"} onClick={onClickDelete} />}
        />
        <Editor initData={data} onSubmit={onSubmit} />
      </div>
    )
  }
};
export default Edit;