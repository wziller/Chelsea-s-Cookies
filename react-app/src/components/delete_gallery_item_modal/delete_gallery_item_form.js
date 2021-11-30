import "./delete_gallery_item_form.css";
import { useDispatch } from "react-redux";
import { deleteReview, getReviews } from "../../store/review";
import { useEffect } from "react";
import { deleteGalleryItem, getGalleryItems } from "../../store/gallery";

const DeleteGalleryItemForm = ({ gallery_item, setShowModal }) => {
  const dispatch = useDispatch();

  const deleteCurrentGalleryItem = async () => {
    await dispatch(deleteGalleryItem(gallery_item.id));
    await dispatch(getGalleryItems());
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  useEffect(() => {}, []);
  return (
    <div>
      <h2>Are you sure you wish to cancel?</h2>
      <p>
        Deleting gallery items is permanent are you sure you want to delete this
        Gallery Item?
      </p>
      <div id="button_container">
        <button id="delete_button" onClick={deleteCurrentGalleryItem}>
          Delete Gallery Item
        </button>
        <button id="cancel_button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteGalleryItemForm;
