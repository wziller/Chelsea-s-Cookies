import "./edit_order_modal.css";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EditOrderForm from "./edit_order_form";
import { Modal } from "../../context/Modal";

function ReviewCartModal({order}) {
  const user = useSelector((state) => state.session.user);
  useEffect(() => {}, []);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Edit Order</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditOrderForm order={order}/>
        </Modal>
      )}
    </div>
  );
}

export default ReviewCartModal;
