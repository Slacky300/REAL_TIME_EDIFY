import React from 'react';
import { useSupplier } from '../context/supplierContext';

const Modal = ({ modalId, handleEvent, title, content, isInfo = false }) => {
    const { darkMode } = useSupplier();

    return (
        <>
            <div className="modal fade" id={modalId} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className={`modal-content ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                        <div className={`modal-header ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            {content}
                        </div>
                        <div className={`modal-footer ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                            {isInfo && <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>}
                            <button type="button" style={{ display: 'none' }} data-bs-dismiss="modal" id="closeTheModal"></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
