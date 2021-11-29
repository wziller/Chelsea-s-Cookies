import './edit_review_form.css'
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddReviewForm from "./edit_review_form";
import { Modal } from "../../context/Modal";

function EditReviewModal({product, review}) {
  const user = useSelector((state) => state.session.user);
  useEffect(() => {}, []);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Edit Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddReviewForm product={product} review={review} setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default EditReviewModal;
