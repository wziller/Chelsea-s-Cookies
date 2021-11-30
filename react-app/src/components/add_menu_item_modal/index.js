
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddMenuItemForm from "./add_menu_item_form";
import { Modal } from "../../context/Modal";
import './add_menu_item_form.css'

function AddMenuItemModal({product}) {
    const user = useSelector((state) => state.session.user);
    useEffect(() => {}, []);
    const [showModal, setShowModal] = useState(false);

    return (
      <div>
        <button onClick={() => setShowModal(true)}>Add Menu Item</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <AddMenuItemForm setShowModal={setShowModal}/>
          </Modal>
        )}
      </div>
    );
  }


  export default AddMenuItemModal
