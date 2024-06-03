// import { Br, Cut, Line, Printer, Text, Row } from 'react-thermal-printer';
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./receipt.css";

const Receipt = () => {

  const [modal, setModal] = useState(true);

  function print() {
    window.print();
  }

  const toggle = () => setModal(!modal);

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Receipt</ModalHeader>
        <ModalBody>
          <div className="receipt">
            {/* <img src="./logo.png" alt="Logo" /> */}
            <div className="centered">
              <h2 class="centered">
                Business Name
                {/* <br>Address line 1</br> */}
                {/* <br>Address line 2</br> */}
              </h2>
              <h4>Branch</h4>
              <h5>Phone</h5>
            </div>
            <table>
              <thead>
                <tr>
                  <th class="description">Item</th>
                  <th class="quantity">Qty</th>
                  <th class="price">Rate</th>
                  <th class="total">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="description">ARDUINO UNO R3</td>
                  <td class="quantity">1.00</td>
                  <td class="price">¢25.00</td>
                  <th class="total">Total</th>
                </tr>
              </tbody>
            </table>
            <p class="centered">
              Thanks for your purchase!
              {/* <br>parzibyte.me/blog</br> */}
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={print}>
            Print
          </Button>{" "}
          <Button color="secondary" onClick={() => { toggle() }}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Receipt;
