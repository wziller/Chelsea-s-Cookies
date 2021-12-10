import './admin_cancel_order_form.css'

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminCancelOrderForm from "./admin_cancel_order_form";
import { Modal } from "../../context/Modal";

function AdminDeleteOrderModal({order}) {
  const user = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Cancel Order</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AdminCancelOrderForm order={order} setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default AdminDeleteOrderModal;
