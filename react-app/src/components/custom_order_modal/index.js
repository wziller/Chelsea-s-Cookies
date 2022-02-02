import './custom_order_form.css'

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CustomOrderForm from "./custom_order_form";
import { Modal } from "../../context/Modal";

function CustomOrderModal({order, setOrderCount, orderCount}) {
  const user = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className='Nav_Button' onClick={() => setShowModal(true)}>Create Custom Order</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CustomOrderForm/>
        </Modal>
      )}
    </div>
  );
}

export default CustomOrderModal;
