import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useSupplier } from '../context/supplierContext';

const Card = ({ cardData, deleteEvent }) => {
    const navigate = useNavigate();
    const { setCurrentDoc, darkMode } = useSupplier();

    // Conditional styles based on darkMode
    const cardBgClass = darkMode ? 'bg-dark text-light' : 'bg-light text-dark';
    const cardTitleClass = darkMode ? 'text-info' : 'text-primary';
    const textMutedClass = darkMode ? 'text-secondary' : 'text-muted';

    return (
        <>
            {cardData?.title && (
                <div className={`col-12`}>
                    <div className={`card ${cardBgClass} shadow-sm  h-100`}>
                        <div className="card-body d-flex flex-column">
                            {/* Card Title and Metadata */}
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className={`card-title ${cardTitleClass} mb-0`}>{cardData?.title}</h5>
                                <small className={textMutedClass}>
                                    {new Date(cardData?.createdAt).toLocaleDateString()}
                                </small>
                            </div>
                            <p className={`${textMutedClass} mb-2`}>Owner: {cardData?.owner?.username}</p>
                            {/* Preview Text */}
                            <p className="card-text mb-4">
                                {cardData?.content?.ops[0]?.insert?.slice(0, 50) || ''}
                                {cardData?.content?.ops[0]?.insert?.length > 50 ? '...' : ''}
                            </p>
                            {/* Action Buttons */}
                            <div className="d-flex justify-content-between mt-auto">
                                <button
                                    className={`btn btn-outline-danger`}
                                    data-bs-toggle="modal"
                                    data-bs-target={`#deleteDoc${cardData?._id}`}
                                >
                                    <i className="bi bi-trash3-fill me-2"></i>Delete
                                </button>
                                <button
                                    onClick={() => {
                                        navigate(`/edit/${cardData._id}`);
                                        setCurrentDoc(cardData);
                                    }}
                                    className={`btn btn-outline-success`}
                                >
                                    <i className="bi bi-pencil-square me-2"></i>Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <Modal
                title="Delete Document"
                modalId={`deleteDoc${cardData?._id}`}
                content={
                    <>
                        <p className="lead text-danger">
                            Are you sure you want to delete the document <strong>{cardData?.title}</strong>?
                        </p>
                        <div className="d-flex justify-content-end mt-4">
                            <button
                                type="button"
                                className="btn btn-secondary me-2"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                onClick={() => deleteEvent(cardData._id)}
                                data-bs-dismiss="modal"
                                className="btn btn-danger"
                            >
                                Delete
                            </button>
                        </div>
                    </>
                }
            />
        </>
    );
};

export default Card;
