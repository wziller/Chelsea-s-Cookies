import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddGalleryItemForm from "./add_gallery_item_form";
import './add_gallery_item_form.css'

function AddReviewModal({product}) {
    const user = useSelector((state) => state.session.user);
    useEffect(() => {}, []);
    const [showModal, setShowModal] = useState(false);

    return (
      <div>
        <button onClick={() => setShowModal(true)}>Add a Review</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <AddGalleryItemForm setShowModal={setShowModal}/>
          </Modal>
        )}
      </div>
    );
  }

  export default AddReviewModal
