import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const AppLayout = () => {
  const [expanded, setExpanded] = useState(false); // Navbar 상태 관리

  const handleToggle = () => setExpanded(!expanded);
  const handleClose = () => setExpanded(false); // 메뉴 클릭 시 닫기

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
              <Nav.Link className="d-flex align-items-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_South_Korea.svg/25px-Flag_of_South_Korea.svg.png"
                  alt="Korea Flag"
                  style={{ width: "20px", height: "15px", marginRight: "5px" }}
                />
                KRW
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className="ms-3" onClick={handleClose}>
                로그인
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;