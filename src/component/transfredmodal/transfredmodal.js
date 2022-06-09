import React, { useEffect, useState } from "react";
import { List, Modal, ModalBody,Collapse, ModalHeader } from 'reactstrap';
import './transfredmodal.css';

const TransferModal = (props) => {
    const {
        isOpen
    } = props;
    const [table, setTable] = useState(false);
    const [open, setOpen] = useState(isOpen);
    useEffect(()=>{
        debugger
        setOpen(isOpen)
    },[isOpen]);

    return (
        <Modal
            isOpen={open}
            toggle={() => setOpen(false)}
        >
             <ModalHeader toggle={() => setOpen(false)}>
                
            </ModalHeader>
            <ModalBody>
                <div className='text-center'>
                    <br />
                </div>
                <div className='view-text-1'>
                    x - Data has tranfered successfully.
                </div>
                <div>
                    <hr />
                    <p className='view-text' onClick={() => {
                        setTable(!table)
                    }}>
                        Data Structure - View Table
                    </p>
                    <hr />

                    <Collapse isOpen={table}>
                        <List type='unstyled' className='text-left-viewitem'>
                            No Data
                        </List>
                    </Collapse>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default TransferModal;