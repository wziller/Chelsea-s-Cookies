import React, { useState, useEffect } from "react";
import SignUpForm from "./SignUpForm"
import { Modal } from "../../../context/Modal";

function SignUpModal() {
  useEffect(() => {

  }, [])
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>SignUp</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm/>
        </Modal>
      )}

    </div>
  );
}

export default SignUpModal;
