import {  Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import Main from './pages/Main';

// state값을 공급하기 위한 Context 객체
export const DiaryStateContext = React.createContext();
// state를 업데이트 하는 함수를 공급하기 위한 Context 객체체
export const DiaryDispatchContext = React.createContext();

// 일기 데이터 관리
function reducer(state, action) {
  switch (action.type) {
    case "INIT" : {
      return action.data;
    }
    case "CREATE": {
      const newState = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "UPDATE" : {
      const newState = state.map((it)=>
        String(it.id) === String(action.data.id) ? {...action.data} : it
      );
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "DELETE" : {
      const newState = state.filter(
        (it) => String(it.id) !== String(action.targetId)
      );
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    default : {
      return state;
    }
  }
}

function App() {
  // 데이터 로딩 상태 구현하기
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // 일기 데이터 관리 state
  const [data, dispatch] = useReducer(reducer, []);
  // 일기 추가 시 key로 사용할 참조 객체 만들기
  const idRef = useRef(0);
  
  useEffect(()=>{
    const rawData = localStorage.getItem("diary");
    if (!rawData) {
      setIsDataLoaded(true);
      return;
    }
    const localData = JSON.parse(rawData);
    if (localData.length === 0) {
      setIsDataLoaded(true);
      return;
    }
    localData.sort((a,b) => Number(b.id) - Number(a.id));
    idRef.current = localData[0].id + 1;
    dispatch({ type: "INIT", data: localData });
    setIsDataLoaded(true);
  },[]);
  // 일기 state 업데이트(작성, 수정, 삭제) 기능 구현하기
  const onCreate = (date, content, emotionId) => {
    dispatch({
      type : "CREATE",
      data : {
        id : idRef.current,
        date : new Date(date).getTime(),
        content,
        emotionId,
      },
    });
    idRef.current += 1;
  }
  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type : "UPDATE",
      data : {
        id : targetId,
        date : new Date(date).getTime(),
        content,
        emotionId,
      },
    });
  };
  const onDelete = (targetId) => {
    dispatch({
      type : "DELETE",
      targetId,
    });
  };

  if(!isDataLoaded) {
    return <div><Main /></div>
  } else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <div className="App">
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/home' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/diary/:id' element={<Diary />} />
              <Route path='/edit/:id' element={<Edit />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}

export default App;
