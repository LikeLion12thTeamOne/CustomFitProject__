import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as i from "../style/styledreviewcheck3";

const Reviewcheck3 = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const {
    product,
    review,
    selectedImage: initialSelectedImage,
  } = location.state || {};
  const [newReview, setNewReview] = useState(review);
  const [selectedImage, setSelectedImage] = useState(initialSelectedImage);
  const [userInfo, setUserInfo] = useState(null);

  const goMain2 = () => navigate(`/Main2`);
  const goMain0 = () => navigate(`/Main0`);
  const goMypage = () => navigate(`/Mypage`);
  const goReview = () => navigate(`/Review`);
  const goLogin = () => navigate(`/Login`);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("3.35.92.28:8000/myPage/profile/", {
        headers: { Authorization: `Token ${token}` },
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // product 객체를 콘솔에 출력하여 확인
  useEffect(() => {
    console.log("Product:", product);
  }, [product]);

  const goReviewcheck2 = () => {
    if (product && newReview) {
      navigate(`/Reviewcheck2`, {
        state: { product, review: newReview, selectedImage },
      });
    } else {
      alert("제품 정보나 리뷰가 없습니다.");
    }
  };

  const handleReviewChange = (e) => setNewReview(e.target.value);
  const handleImageSelect = (image) => setSelectedImage(image);

  const saveReview = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const csrfTokenMatch = document.cookie.match(/csrftoken=([^;]*)/);
      const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : "";

      const config = {
        headers: {
          Authorization: `Token ${token}`,
          "X-CSRFToken": csrfToken,
        },
      };

      const body = {
        GNB: selectedImage === "good" ? "G" : "B",
        review: newReview,
      };

      await axios.patch(
        `3.35.92.28:8000/myPage/recommended-products/${product.id}/edit/`,
        body,
        config
      );

      navigate(`/Reviewcheck1`, {
        state: { product, review: newReview, selectedImage },
      });
    } catch (err) {
      if (err.message === "No token found") {
        alert("토큰이 없습니다. 로그인이 필요합니다.");
        navigate("/login");
      } else {
        console.error("An error occurred:", err.message);
      }
    }
  };

  return (
    <i.Container>
      <i.Header>
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
        <img
          id="logo"
          src="/static/logo/ylogo.svg"
          alt="logo"
          width="40px"
          onClick={goMain2}
        />
        <img
          id="alarm"
          src="/static/logo/alarm.svg"
          alt="alarm button"
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            cursor: "pointer",
          }}
          onClick={() => navigate(-1)}
        />
        <img
          id="menu"
          src="/static/logo/menu.svg"
          alt="menu button"
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            cursor: "pointer",
          }}
          onClick={toggleMenu}
        />
        <i.Border>
          <div></div>
        </i.Border>
      </i.Header>

      {isMenuOpen && (
        <>
          <i.Backdrop onClick={closeMenu} />
          <i.DropdownMenu>
            <i.DropdownItem onClick={goMypage}>
              <img
                id="mypage"
                src="/static/logo/mypage.svg"
                alt="mypage"
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  cursor: "pointer",
                }}
                onClick={toggleMenu}
              />
            </i.DropdownItem>
            <i.DropdownItem onClick={goReview}>
              <img
                id="myreview"
                src="/static/logo/myreview.svg"
                alt="myreview"
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  cursor: "pointer",
                }}
                onClick={toggleMenu}
              />
            </i.DropdownItem>
            <i.DropdownItem onClick={goMain0}>
              <img
                id="mainpage"
                src="/static/logo/mainpage.svg"
                alt="mainpage"
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  cursor: "pointer",
                }}
                onClick={toggleMenu}
              />
            </i.DropdownItem>
            <i.DropdownItem onClick={goLogin}>
              <img
                id="logout"
                src="/static/logo/logout.svg"
                alt="logout"
                style={{
                  position: "absolute",
                  right: "8px",
                  cursor: "pointer",
                }}
                onClick={toggleMenu}
              />
            </i.DropdownItem>
          </i.DropdownMenu>
        </>
      )}

      <i.Top>리뷰 수정하기</i.Top>

      <i.Body>
        <i.Under>
          {userInfo ? `${userInfo.first_name}님!` : "사용자님!"} <br />[
          {product ? product.name : "상품명 없음"}]은 어떠셨어요?
        </i.Under>

        <i.Button2>
          <i.ReviewImage
            type="good"
            src="/static/logo/good.svg"
            alt="good"
            onClick={() => handleImageSelect("good")}
            style={{
              cursor: "pointer",
              border: selectedImage === "good" ? "2px solid blue" : "none",
            }}
          />
          <i.ReviewImage
            type="bad"
            src="/static/logo/bad.svg"
            alt="bad"
            onClick={() => handleImageSelect("bad")}
            style={{
              cursor: "pointer",
              border: selectedImage === "bad" ? "2px solid blue" : "none",
            }}
          />
        </i.Button2>

        <i.InputBlank>
          <input
            type="text"
            value={newReview}
            onChange={handleReviewChange}
            placeholder="텍스트 리뷰를 작성해 주세요."
          />
        </i.InputBlank>

        <i.Button onClick={saveReview}>
          <i.ButtonText>저장하기</i.ButtonText>
        </i.Button>

        <i.ButtonTwo onClick={goReviewcheck2}>
          <i.ButtonText>수정 취소하기</i.ButtonText>
        </i.ButtonTwo>
      </i.Body>
    </i.Container>
  );
};

export default Reviewcheck3;
