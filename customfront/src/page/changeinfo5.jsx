import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as i5 from "../style/styledchangeinfo5";

const Changeinfo5 = () => {
  const navigate = useNavigate();
  const [selectedBox, setSelectedBox] = useState(null); // 클릭된 박스의 인덱스를 관리
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보를 관리
  const [userError, setUserError] = useState(null); // 사용자 정보 에러를 관리
  const [loading, setLoading] = useState(false); // 로딩 상태를 관리
  const [apiError, setApiError] = useState(null); // API 에러를 관리

  useEffect(() => {
    fetchUserInfo(); // 컴포넌트가 마운트될 때 사용자 정보를 가져오는 함수 호출
  }, []);

  // 사용자 정보를 가져오는 함수
  const fetchUserInfo = async () => {
    setLoading(true); // 로딩 시작
    try {
      const token = localStorage.getItem("token"); // 로그인 후 저장된 토큰을 가져옵니다.
      if (!token) {
        throw new Error("로그인 토큰이 없습니다.");
      }

      const response = await axios.get("3.35.92.28:8000/myPage/profile/", {
        headers: {
          Authorization: `Token ${token}`, // Authorization 헤더에 토큰을 포함합니다.
        },
      });

      console.log("사용자 정보:", response.data); // 디버그 로그 추가
      setUserInfo(response.data); // 사용자 정보 저장
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error.message);
      setUserError(error.message); // 에러 메시지 설정
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const goChangeinfo = () => {
    navigate(`/Changeinfo`);
  };

  // 몸무게를 업데이트하는 함수
  const updateWeight = async (weightRange) => {
    setLoading(true); // 로딩 시작
    try {
      const token = localStorage.getItem("token"); // 로그인 후 저장된 토큰을 가져옵니다.
      if (!token) {
        throw new Error("로그인 토큰이 없습니다.");
      }

      const response = await axios.put(
        "3.35.92.28:8000/myPage/update/weight/", // API 엔드포인트
        { weight: weightRange }, // 요청 데이터
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("몸무게 업데이트 성공:", response.data); // 디버그 로그 추가
    } catch (error) {
      console.error("몸무게 업데이트 오류:", error.message);
      if (error.response) {
        console.error("응답 데이터:", error.response.data);
      }
      setApiError(error.message); // 에러 메시지 설정
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const handleBoxClick = (index) => {
    setSelectedBox(index); // 클릭된 박스의 인덱스를 상태로 저장
    const weightRanges = [
      "under_39",
      "40-44",
      "45-49",
      "50-54",
      "55-59",
      "60-64",
      "65-69",
      "70-74",
      "75-79",
      "80-84",
      "85-89",
      "90-94",
      "95-99",
      "over_100",
    ];
    updateWeight(weightRanges[index]); // 선택된 몸무게 범위로 업데이트
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userError) {
    // 사용자 정보 에러가 있는 경우
    return <div>Error: {userError}</div>;
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  if (apiError) {
    // API 에러가 있는 경우
    return <div>Error: {apiError}</div>;
  }

  return (
    <i5.Container>
      <i5.Header>
        <img
          id="back"
          src="/static/logo/backbtn.svg"
          alt="back button"
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            cursor: "pointer",
          }}
          onClick={() => navigate(-1)}
        />
      </i5.Header>

      <i5.Ybox>
        <i5.Top>
          나에게{" "}
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            딱 맞는 맞춤 비교
          </span>
          를 위해
          <br />
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            키워드 선택
          </span>
          을 진행해 주세요!
        </i5.Top>

        <i5.Text>
          <br />
          <br />
          🔵 <span>몸무게</span>를 선택해 주세요.
        </i5.Text>
      </i5.Ybox>

      <i5.Body>
        <i5.Box>
          <i5.Box2>
            {[
              "39kg 이하",
              "40~44kg",
              "45~49kg",
              "50~54kg",
              "55~59kg",
              "60~64kg",
              "65~69kg",
              "70~74kg",
              "75~79kg",
              "80~84kg",
              "85~89kg",
              "90~94kg",
              "100kg 이상",
            ].map((weightRange, index) => (
              <i5.Keywordd key={index}>
                <i5.SmallBox5
                  isClicked={selectedBox === index} // 클릭 상태에 따라 스타일 적용
                  onClick={() => handleBoxClick(index)} // 클릭 시 상태 업데이트
                >
                  <span style={{ fontWeight: "500", fontSize: "15px" }}>
                    {weightRange}
                  </span>
                </i5.SmallBox5>
              </i5.Keywordd>
            ))}
          </i5.Box2>
        </i5.Box>

        <i5.Button>
          <img
            id="restore"
            src="/static/logo/restore.svg"
            alt="restore"
            onClick={goChangeinfo}
          />
        </i5.Button>
      </i5.Body>
    </i5.Container>
  );
};

export default Changeinfo5;
