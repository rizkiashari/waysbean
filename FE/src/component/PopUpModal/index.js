import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import Style from "./PopUp.module.css";

export const PopUpModal = (props) => {
  const { title, showModal, handleClose } = props;
  return (
    <Modal
      className={Style.ModalContainer}
      show={showModal}
      onHide={handleClose}>
      <Modal.Body>
        <p className={Style.ModalTitle}>{title}</p>
      </Modal.Body>
    </Modal>
  );
};

export const PopUpVerify = (props) => {
  const { title, showModal, handleClose } = props;
  return (
    <Modal
      className={Style.ModalContainer}
      show={showModal}
      onHide={handleClose}>
      <Modal.Body>
        <p className={Style.ModalTitle}>{title}</p>
        <Link to='/profile'>
          <p className={Style.Link}>Click here</p>
        </Link>
      </Modal.Body>
    </Modal>
  );
};

// export const ModalApprove = (props) => {
//   const { showModal, handleClose, name } = props;
//   return (
//     <Modal show={showModal} onHide={handleClose}>
//       <Modal.Body>
//         <p>Apakah kamu yakin ingin menghapus item {name}</p>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant='secondary'>Close</Button>
//         <Button variant='primary'>Save changes</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };
