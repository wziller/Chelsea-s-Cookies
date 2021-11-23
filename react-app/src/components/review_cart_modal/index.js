import "./review_cart.css";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReviewCartWindow from "./review_cart";
import LoginForm from '../auth/login_modal/LoginForm'
import { Modal } from "../../context/Modal";

function ReviewCartModal() {
  const user = useSelector((state) => state.session.user);
  useEffect(() => {}, []);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Review Cart</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {user &&<ReviewCartWindow setShowModal={setShowModal} />}
          {!user && <LoginForm/>}
        </Modal>
      )}
    </div>
  );
}

export default ReviewCartModal;
