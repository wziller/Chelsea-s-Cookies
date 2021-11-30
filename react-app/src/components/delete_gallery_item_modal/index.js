import './delete_gallery_item_form.css'

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DeleteGalleryItemForm from "./delete_gallery_item_form";
import { Modal } from "../../context/Modal";

function DeleteGalleryItemModal({gallery_item}) {
  const user = useSelector((state) => state.session.user);
  useEffect(() => {}, []);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Delete Gallery Item</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteGalleryItemForm gallery_item={gallery_item} setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default DeleteGalleryItemModal;
