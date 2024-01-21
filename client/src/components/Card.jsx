import React from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal';
import { useSupplier } from '../context/supplierContext';

const Card = ({ cardData, deleteEvent }) => {
    const navigate = useNavigate();
    const {setCurrentDoc} = useSupplier();
    return (
        <>
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{cardData?.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{cardData?.createdAt}</h6>
                    <p className="card-text">{cardData?.content}</p>
                    <button className="btn btn-danger me-4" data-bs-toggle="modal" data-bs-target={`#${"deleteDoc"+cardData?._id}`}>Delete</button>
                    <button href="#" onClick={() => {navigate(`/edit/${cardData._id}`); setCurrentDoc(cardData)}} className="btn btn-success">Edit</button>
                </div>
            </div>

            <Modal title={"Delete Document"} modalId={"deleteDoc"+cardData?._id} content={
                <>
                    <div className='col-md-12'>
                        <p className='lead display-6'>Are you sure you want to delete {cardData?.title} document?</p>
                    </div>
                    <div className="mb-3 d-flex justify-content-end">

                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" onClick={() => deleteEvent(cardData._id)}  data-bs-dismiss="modal" className="btn btn-danger ms-2">Delete</button>
                    </div>
                </>

            } />

        </>
    )
}

export default Card