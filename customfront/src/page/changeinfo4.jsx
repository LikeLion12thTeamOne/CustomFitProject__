import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as i4 from "../style/styledchangeinfo4";

const Changeinfo4 = () => {
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

  // 키를 업데이트하는 함수
  const updateHeight = async (heightRange) => {
    setLoading(true); // 로딩 시작
    try {
      const token = localStorage.getItem("token"); // 로그인 후 저장된 토큰을 가져옵니다.
      if (!token) {
        throw new Error("로그인 토큰이 없습니다.");
      }

      console.log("업데이트할 키 범위:", heightRange); // 디버그 로그 추가

      const response = await axios.put(
        "3.35.92.28:8000/myPage/update/height/",
        { height: heightRange }, // height를 문자열로 전달
        {
          headers: {
            Authorization: `Token ${token}`, // Authorization 헤더에 토큰을 포함합니다.
            "Content-Type": "application/json",
          },
        }
      );

      console.log("키 업데이트 성공:", response.data); // 디버그 로그 추가
      // 성공적인 업데이트 후 추가적인 상태 업데이트나 화면 전환을 수행할 수 있습니다.
    } catch (error) {
      console.error("키 업데이트 오류:", error.message);
      console.error("응답 데이터:", error.response?.data); // 응답 데이터 로깅
      setApiError(error.message); // 에러 메시지 설정
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 클릭된 박스의 상태를 업데이트하고 키를 업데이트하는 함수
  const handleBoxClick = (index) => {
    setSelectedBox(index); // 클릭된 박스의 인덱스를 상태로 저장
    const heightRanges = [
      "under_149",
      "150-154",
      "155-159",
      "160-164",
      "165-169",
      "170-174",
      "175-179",
      "over_180",
    ];
    updateHeight(heightRanges[index]);
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
    <i4.Container>
      <i4.Header>
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
      </i4.Header>

      <i4.Ybox>
        <i4.Top>
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
        </i4.Top>

        <i4.Text>
          <br />
          <br />
          🟢 <span>키</span>를 선택해 주세요.
        </i4.Text>
      </i4.Ybox>

      <i4.Body>
        <i4.Box>
          <i4.Box2>
            {[
              "149cm 이하",
              "150~154cm",
              "155~159cm",
              "160~164cm",
              "165~169cm",
              "170~174cm",
              "175~179cm",
              "180cm 이상",
            ].map((heightRange, index) => (
              <i4.Keywordd key={index}>
                <i4.SmallBox5
                  isClicked={selectedBox === index} // 클릭 상태에 따라 스타일 적용
                  onClick={() => handleBoxClick(index)} // 클릭 시 상태 업데이트
                >
                  <span style={{ fontWeight: "500", fontSize: "15px" }}>
                    {heightRange}
                  </span>
                </i4.SmallBox5>
              </i4.Keywordd>
            ))}
          </i4.Box2>
        </i4.Box>

        <i4.Button>
          <img
            id="restore"
            src="/static/logo/restore.svg"
            alt="restore"
            onClick={goChangeInfo}
          />
        </i4.Button>
      </i4.Body>
    </i4.Container>
  );
};

export default Changeinfo4;
