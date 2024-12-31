import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import LoginModal from "./component/LoginModal";

const AppLayout = () => {
  const [expanded, setExpanded] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleToggle = () => setExpanded(!expanded);
  const handleClose = () => setExpanded(false);

  const handleLoginModalOpen = () => setShowLoginModal(true);
  const handleLoginModalClose = () => setShowLoginModal(false);

  const handleLogin = () => {
    setIsLoggedIn(true); 
    setShowLoginModal(false); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
  };

  return (
    <div>
      <Navbar bg="white" expand="lg" expanded={expanded} className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="text-success fw-bold">
            HOTEL.COM
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav " onClick={handleToggle} />
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

            <Nav className="ms-auto">
              {isLoggedIn ? (
                <Nav.Link
                  as="button"
                  className="btn  ms-3"
                  onClick={handleLogout}
                >
                  로그아웃
                </Nav.Link>
              ) : (
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

      <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} handleLogin={handleLogin} />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;