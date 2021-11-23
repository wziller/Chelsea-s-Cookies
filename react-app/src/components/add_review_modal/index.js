import './add_review_form.css'
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddReviewForm from "./add_review_form";
import { Modal } from "../../context/Modal";

function AddReviewModal({product}) {
  const user = useSelector((state) => state.session.user);
  useEffect(() => {}, []);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Add a Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddReviewForm product={product}/>
        </Modal>
      )}
    </div>
  );
}

export default AddReviewModal;
