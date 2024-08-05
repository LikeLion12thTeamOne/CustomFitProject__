import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as i1 from "../style/styledchangeinfo1";

const Changeinfo1 = () => {
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

  const goChangeInfo = () => {
    navigate(`/changeinfo`);
  };

  // 연령대를 업데이트하는 함수
  const updateAge = async (ageRange) => {
    setLoading(true); // 로딩 시작
    try {
      const token = localStorage.getItem("token"); // 로그인 후 저장된 토큰을 가져옵니다.
      if (!token) {
        throw new Error("로그인 토큰이 없습니다.");
      }

      const response = await axios.put(
        "3.35.92.28:8000/myPage/update/age/",
        { age: ageRange },
        {
          headers: {
            Authorization: `Token ${token}`, // Authorization 헤더에 토큰을 포함합니다.
            "Content-Type": "application/json",
          },
        }
      );

      console.log("나이 업데이트 성공:", response.data); // 디버그 로그 추가
      // 여기서 추가적인 상태 업데이트나 화면 전환을 수행할 수 있습니다.
    } catch (error) {
      console.error("나이 업데이트 오류:", error.message);
      setApiError(error.message); // 에러 메시지 설정
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 클릭된 박스의 상태를 업데이트하는 함수
  const handleBoxClick = (index) => {
    setSelectedBox(index); // 클릭된 박스의 인덱스를 상태로 저장
    const ageRanges = [
      "under_19",
      "20-29",
      "30-39",
      "40-49",
      "50-59",
      "60-69",
      "over_70",
    ];
    updateAge(ageRanges[index]); // 선택된 연령대로 업데이트
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
    <i1.Container>
      <i1.Header>
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
      </i1.Header>

      <i1.Ybox>
        <i1.Top>
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
        </i1.Top>

        <i1.Text>
          <br />
          <br />
          🔴 <span>연령대</span>를 선택해 주세요.
        </i1.Text>
      </i1.Ybox>

      <i1.Body>
        <i1.Box>
          <i1.Box2>
            {[
              "19세 이하",
              "20-29세",
              "30-39세",
              "40-49세",
              "50-59세",
              "60-69세",
              "70세 이상",
            ].map((ageRange, index) => (
              <i1.Keywordd key={index}>
                <i1.SmallBox5
                  isClicked={selectedBox === index} // 클릭 상태에 따라 스타일 적용
                  onClick={() => handleBoxClick(index)} // 클릭 시 상태 업데이트
                >
                  <span style={{ fontWeight: "500", fontSize: "15px" }}>
                    {ageRange}
                  </span>
                </i1.SmallBox5>
              </i1.Keywordd>
            ))}
          </i1.Box2>
        </i1.Box>

        <i1.Button>
          <img
            id="restore"
            src="/static/logo/restore.svg"
            alt="restore"
            onClick={goChangeInfo}
          />
        </i1.Button>
      </i1.Body>
    </i1.Container>
  );
};

export default Changeinfo1;
