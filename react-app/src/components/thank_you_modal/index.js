import ThankYouDisplay from "./thank_you_window"
const ThankYouModal = () => {
    return(
    <div>
        <button onClick={() => setShowModal(true)}>Review Cart</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <ThankYouDisplay setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
      )
}

export default ThankYouModal
