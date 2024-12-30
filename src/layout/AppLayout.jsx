import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import LoginModal from "./component/LoginModal";

const AppLayout = () => {
  const [expanded, setExpanded] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  const handleToggle = () => setExpanded(!expanded);
  const handleClose = () => setExpanded(false);

  // 로그인 모달 열기 및 닫기
  const handleLoginModalOpen = () => setShowLoginModal(true);
  const handleLoginModalClose = () => setShowLoginModal(false);

  // 로그인 처리
  const handleLogin = () => {
    setIsLoggedIn(true); // 로그인 상태로 변경
    setShowLoginModal(false); // 모달 닫기
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setIsLoggedIn(false); // 로그아웃 상태로 변경
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" expanded={expanded} className="shadow-sm">
        <Container>
          {/* 로고 */}
          <Navbar.Brand as={Link} to="/" className="text-success fw-bold">
            HOTEL.COM
          </Navbar.Brand>

          {/* 카테고리 메뉴 */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/search/accommodation" onClick={handleClose}>
                숙박
              </Nav.Link>
              <Nav.Link as={Link} to="/search/leisure" onClick={handleClose}>
                레저
              </Nav.Link>
              <Nav.Link as={Link} to="/search/festival" onClick={handleClose}>
                축제
              </Nav.Link>
              <Nav.Link as={Link} to="/search/tour" onClick={handleClose}>
                여행코스
              </Nav.Link>
            </Nav>

            {/* 오른쪽 메뉴 */}
            <Nav className="ms-auto">
              {isLoggedIn ? (
                // 로그아웃 버튼
                <Nav.Link
                  as="button"
                  className="btn  ms-3"
                  onClick={handleLogout}
                >
                  로그아웃
                </Nav.Link>
              ) : (
                // 로그인 버튼
                <Nav.Link
                  as="button"
                  className="btn btn-outline-success ms-3"
                  onClick={handleLoginModalOpen}
                >
                  로그인
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 로그인 모달 */}
      <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} handleLogin={handleLogin} />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;