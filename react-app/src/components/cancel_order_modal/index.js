import './cancel_order_form.css'

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CancelOrderForm from "./cancel_order_form";
import { Modal } from "../../context/Modal";

function DeleteOrderModal({order, setOrderCount, orderCount}) {
  const user = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Cancel Order</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CancelOrderForm setOrderCount={setOrderCount} orderCount={orderCount} order={order} setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default DeleteOrderModal;
