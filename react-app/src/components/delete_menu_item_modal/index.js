import "./delete_menu_item_form.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DeleteMenuItemForm from "./delete_menu_item_form";
import { Modal } from "../../context/Modal";

function DeleteMenuItemModal({ product }) {
  const user = useSelector((state) => state.session.user);
  useEffect(() => {}, []);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Delete Menu Item</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteMenuItemForm
            product={product}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default DeleteMenuItemModal;
