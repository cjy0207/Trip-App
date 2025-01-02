import React from 'react';
import '../Footer/Footer.style.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h1>Trip.com</h1>
          <p>Explore the world with us!</p>
        </div>
        <div className="footer-links">
          <p>Follow us please</p>
          <ul>
            <li><a href="https://github.com/cjy0207">Developer</a></li>
            <li><a href="https://github.com/JunSehyeon">Designer</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-details">
        <p><strong>주식회사 트립닷컴컴퍼니</strong></p>
        <p>주소: 서울시 구로구 연동로 320 | 대표이사: 나도모름</p>
        <p>전자우편주소: abcdefg@icloud.com | 전화번호: 1234-5678</p>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Trip.com. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
