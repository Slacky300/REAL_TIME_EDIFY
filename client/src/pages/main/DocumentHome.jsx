import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import { createNewDoc, deleteTheDoc, getAllLoggedInUserDocs } from '../../helpers/docs/doc.helper';
import { toast } from 'react-toastify';
import { useSupplier } from '../../context/supplierContext';

const DocumentHome = () => {

    const { auth } = useAuth();
    const [data, setData] = useState([{}]);
    const [title, setTitle] = useState('');
    const { loading, setLoading, shouldUpdate, triggerUpdate } = useSupplier();

    useEffect(() => {


        const setDocuments = async () => {

            const documents = await getAllLoggedInUserDocs(auth?.token);


            if (documents?.status === 200) {
                setData(documents?.data?.documents);
                return;
            }

            toast.error(documents?.message);



        }

        auth?.token ? setDocuments() : null;

        auth?.token ? document.title = `Welcome ${auth?.user?.username} 👋` : null


    }, [auth?.token, shouldUpdate]);

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await createNewDoc(title, auth?.token).finally(() => { setLoading(false); });

        if (result?.status === 201) {

            setTitle('');
            toast.success('Document Created Successfully');
            document.getElementById("closeTheModal").click();
            triggerUpdate();
            return;
        }

        toast.error(result?.message);


    }

    const handleDelete = async (id) => {
        setLoading(true);
        const res = await deleteTheDoc(id, auth?.token).finally(() => { setLoading(false); });
        if (res?.status === 200) {
            toast.success(res.message);
            triggerUpdate();
            return;
        }

        toast.error(res?.message);
    }

    return (
        <>
            <div className='container my-3'>
                <div className='row ms-4 d-flex justify-content-center'>
                    <h1 className='lead display-5 justify-content-space-between'>Hello {auth?.user?.username} 👋 <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${"createDoc"}`}>
                        Create New
                    </button> </h1>


                    <p className='lead display-6'>Welcome to your document home page</p>
                </div>
                <div className='row d-flex justify-content-center align-items-center'>

                    {!loading ? (data?.map((cardData, index) => {
                        return (
                            <div key={index} className='col-md-4 my-3 d-flex justify-content-center align-items-center'>
                                <Card cardData={cardData}  deleteEvent={handleDelete}/>
                            </div>
                        )
                    })) : (<Loader />)}
                </div>
            </div>

            <Modal title={"Create New Document"} modalId={"createDoc"} content={
                <form className='form-control' onSubmit={handleAdd}>
                    <div className="mb-3">
                        
                        <label htmlFor="title" className="htmlForm-label my-2">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" placeholder={"Document Title"} />

                    </div>

                    <div className="mb-3 d-flex justify-content-end">

                        <button type="submit" disabled={loading} className="btn btn-primary">{loading ? "Creating" : "Create"}</button>

                    </div>
                </form>
            } />

        </>
    )
}

export default DocumentHome