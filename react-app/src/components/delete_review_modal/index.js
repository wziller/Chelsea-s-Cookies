import './delete_review_form.css'

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DeleteReviewForm from "./delete_review_form";
import { Modal } from "../../context/Modal";

function DeleteReviewModal({review}) {
  const user = useSelector((state) => state.session.user);
  useEffect(() => {}, []);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Delete Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteReviewForm review={review} setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default DeleteReviewModal;
