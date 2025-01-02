import React, { useState } from "react";
import "./ReservationModal.style.css";

const ReservationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    people: "1",
    phone: "",
    memo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reservation Submitted:", formData);
    alert("예약이 완료되었습니다!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>예약하기</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">예약자명</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="people">인원수</label>
            <select
              id="people"
              name="people"
              value={formData.people}
              onChange={handleChange}
              required
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}명
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="phone">전화번호</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="memo">메모</label>
            <textarea
              id="memo"
              name="memo"
              value={formData.memo}
              onChange={handleChange}
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              취소
            </button>
            <button type="submit">예약</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;