import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const LoginModal = ({ show, handleClose, handleLogin }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>LOGIN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="이메일을 입력하세요" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="비밀번호를 입력하세요" />
          </Form.Group>
          <Button
            variant="success"
            type="button"
            className="w-100"
            onClick={handleLogin} // 로그인 처리 함수 호출
          >
            login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;