import React from 'react'

const Modal = ({modalId, handleEvent, title, content, isInfo = false}) => {
    return (
        <>
            <div className="modal  fade" id={modalId} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-dark text-light">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            {content}
                        </div>
                        <div className="modal-footer">
                            {isInfo && <button type="button" className="btn btn-secondary"  data-bs-dismiss="modal">Close</button>}
                            <button type="button" style={{display: "none"}} data-bs-dismiss="modal"  id="closeTheModal" ></button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Modal