import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as y from "../style/styledalarm2";

const Alarm2 = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const goMain0 = () => {
    navigate(`/Main0`);
  };

  const goMain2 = () => {
    navigate(`/Main2`);
  };

  const goChangeinfo = () => {
    navigate(`/changeinfo`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <y.Container>
      <y.Header>
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
            right: "8px",
            cursor: "pointer",
          }}
          onClick={toggleMenu}
        />
        <y.Border>
          <div></div>
        </y.Border>
      </y.Header>

      <y.Ybox>
        <y.Top>
          <img
            id="alarm2"
            src="/static/logo/alarm2.svg"
            alt="alarm2"
            style={{
              height: "750px",
            }}
          />
        </y.Top>
      </y.Ybox>

      <y.Body>
        <y.Button>
          <y.ButtonText onClick={goChangeinfo}>
            키워드 변경하러 가기
          </y.ButtonText>
        </y.Button>
      </y.Body>

      {isMenuOpen && (
        <>
          <y.Backdrop onClick={closeMenu} />
          <y.DropdownMenu>
            <y.DropdownItem onClick={() => navigate("/mypage")}>
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
            </y.DropdownItem>
            <y.DropdownItem onClick={() => navigate("/myreview")}>
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
            </y.DropdownItem>
            <y.DropdownItem onClick={goMain0}>
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
            </y.DropdownItem>
          </y.DropdownMenu>
        </>
      )}
    </y.Container>
  );
};

export default Alarm2;
