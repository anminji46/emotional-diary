import { useContext, useEffect, useState } from "react";
import Button from "../component/Button";
import Header from "../component/Header";
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate, setPageTitle } from "../util";
import DiaryList from "../component/DiaryList";

const Home = () => {
  const data = useContext(DiaryStateContext);
  // 헤더에 표시할 날짜 저장 state
  const [pivotDate, setPivotDate] = useState(new Date());
  // 각 월에 해당하는 필터링 된 일기데이터를 저장할 state
  const [filteredData, setFilteredData] = useState([]);
  // pivotDate에 저장된 Date객체를 문자열로 만들어 변수에 저장
  const headerTitle = `${pivotDate.getFullYear()}년
                        ${pivotDate.getMonth()+1}월`;
  // pivotDate의 값을 한달 후로 업데이트하는 함수
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1));
  };
  // pivotDate의 값을 한달 전으로 업데이트하는 함수
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1));
  };

  // pivotDate가 변할 때마다 해당 월의 일기데이터 필터링
  useEffect(() => {
    if(data.length >= 1) {
      const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
      setFilteredData(
        data.filter(
          (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
        )
      );
    } else {
      setFilteredData([]);
    }
  }, [data, pivotDate]);

  useEffect(() => {
    setPageTitle("몽글몽글 감정일기장");
  },[]);

  return (
    <div>
      <Header 
        title={headerTitle}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      />
      <DiaryList data={filteredData} />
    </div>
  )
};
export default Home;