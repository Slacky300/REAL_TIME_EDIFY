import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSupplier } from '../../context/supplierContext';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal';
import { addCollaboratorToDoc, getAllCollaborators } from '../../helpers/docs/doc.helper';
import { useAuth } from '../../context/authContext';
import { API } from '../../helpers/config';
import Editor from './Editor.jsx';

const EditDocument = () => {
    const [currentUsers, setCurrentUsers] = useState([]);
    const [collaboratorEmail, setCollaboratorEmail] = useState('');
    const [collaborators, setCollaborators] = useState([]);
    const [isModified, setIsModified] = useState(false);  // State to track document modifications

    const navigate = useNavigate();
    const { auth } = useAuth();
    const { currentDoc, loading, socket, setCurrentDoc, triggerUpdate, quill, setLoading } = useSupplier();
    const { id } = useParams();

    const handleAddCollaborator = async () => {
        setLoading(true);
        const res = await addCollaboratorToDoc(currentDoc?._id, collaboratorEmail, auth?.token).finally(() => setLoading(false));
        if (res?.status === 200) {
            setCollaboratorEmail('');
            document.getElementById('closeTheModal').click();
            toast.success(res?.data?.message);
            triggerUpdate();
            return;
        }
        toast.error(res?.data?.message);
    };

    useEffect(() => {
        if (quill == null || !currentDoc?._id) return;

        socket.emit("get-doc", { docId: currentDoc?._id });

        socket.once('load-document', document => {
            quill.setContents(document);
            quill.enable();
        });
    }, [quill, socket, currentDoc]);

    // Register document modifications and mark as modified
    useEffect(() => {
        if (quill == null || !currentDoc?._id) return;

        const handleTextChange = (delta, oldDelta, source) => {
            if (source === 'user') {
                setIsModified(true);  // Mark as modified when the user makes changes
            }
        };

        quill.on('text-change', handleTextChange);

        return () => {
            quill.off('text-change', handleTextChange);
        };
    }, [quill, currentDoc]);

    // Check and save only if there are modifications
    useEffect(() => {
        if (quill == null) return;

        const interval = setInterval(() => {
            if (isModified) {
                toast.info('Saving document...');
                socket.emit("save-doc", { docId: currentDoc?._id, data: quill?.getContents() }, (error) => {
                    if (error) {
                        console.error(error);
                    } else {
                        toast.success('Document saved successfully');
                        setIsModified(false);  // After saving, mark as not modified
                    }
                });
            }
        }, 30000);  // Interval to check for modifications

        return () => {
            clearInterval(interval);
        };
    }, [quill, isModified, currentDoc]);

    // Function to save immediately when necessary (can be called when leaving the page, for example)
    const saveDocumentImmediately = () => {
        if (isModified) {
            socket.emit("save-doc", { docId: currentDoc?._id, data: quill?.getContents() }, (error) => {
                if (error) {
                    console.error(error);
                } else {
                    toast.success('Document saved successfully');
                    setIsModified(false);  // After saving, mark as not modified
                }
            });
        }
    };

    // Other collaborator and room functionalities
    useEffect(() => {
        const fetchCollaborators = async () => {
            setLoading(true);
            const res = await getAllCollaborators(currentDoc?._id, auth?.token).finally(() => setLoading(false));
            if (res?.status === 200) {
                setCollaborators(res?.data?.collaborators);
            }
        };

        const resetCurrentDocStateOnReload = async () => {
            const fetchDoc = await fetch(`${API}/documents/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.token}`
                }
            });
            const doc = await fetchDoc.json();
            setCurrentDoc(doc?.document);
        };

        if (!currentDoc && auth?.token) {
            resetCurrentDocStateOnReload();
        }
        if (auth?.token && currentDoc?._id) {
            fetchCollaborators();
        }
    }, [auth, currentDoc, setCurrentDoc]);

    useEffect(() => {
        if (quill == null || !currentDoc?._id) return;

        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return;
            socket.emit('send-changes', { delta, roomId: currentDoc?._id, username: auth?.user?.username });
        };

        quill.on('text-change', handler);

        return () => {
            quill.off('text-change', handler);
        };
    }, [quill, socket, currentDoc]);

    useEffect(() => {
        if (quill == null || !currentDoc?._id) return;

        const handleSomeoneJoined = (data) => {
            setCurrentUsers(data?.roomUsers);
        };

        const handleSomeoneLeft = (data) => {
            setCurrentUsers(data?.roomUsers);
        };

        socket.emit('joinRoom', { roomId: currentDoc?._id, username: auth?.user?.username }, (error) => {
            if (error) {
                console.error('Error joining room:', error);
            }
        });

        socket.on('someoneJoined', handleSomeoneJoined);
        socket.on('someoneLeft', handleSomeoneLeft);

        return () => {
            if (quill) {
                quill.disable();
            }

            socket.emit('leaveRoom', { roomId: currentDoc?._id, username: auth?.user?.username }, (error) => {
                if (error) {
                    console.error('Error leaving room:', error);
                }
            });

            socket.off('someoneJoined', handleSomeoneJoined);
            socket.off('someoneLeft', handleSomeoneLeft);
            setCurrentUsers([]);
        };
    }, [currentDoc, socket, auth?.user?.username]);

    return (
        <div className='container my-4'>
            <div className='row d-flex justify-content-center align-items-center'>
                <div className='my-3 col-lg-10 col-xl-8 d-flex justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                        <button type="button" className="btn btn-warning me-2" onClick={() => navigate(-1)}>
                            <i className="bi bi-arrow-left"></i>
                        </button>
                    </div>
                    <div className='d-flex align-items-center'>
                        <h1 className='display-6 text-center'>Document Title: <u> {currentDoc?.title}</u>
                            <button
                                type="button"
                                className='btn btn-secondary ms-5'
                                data-bs-toggle="modal"
                                data-bs-target={`#${"collaborators"}`}
                            ><i class="bi bi-eye-fill"></i></button></h1>
                    </div>
                    <div className='d-flex align-items-center'>
                        <button
                            type="button"
                            className="btn btn-primary me-2"
                            data-bs-toggle="modal"
                            data-bs-target={`#${"addCollaborator"}`}
                        >
                            <i className="bi bi-person-fill-add"></i>&nbsp;Add Collaborator
                        </button>
                    </div>
                </div>
                <div className='col-md-12 col-lg-2 col-xl-4 mb-4'>
                    <ul className="list-group">
                        <li className="list-group-item  active" aria-current="true">
                            <i className="bi bi-people-fill"></i> Online Collaborators ({currentUsers?.length})
                        </li>
                        {currentUsers?.map((user, index) => (
                            <li key={index} className="list-group-item  bg-dark text-light">
                                <i className="bi bi-person"></i>&nbsp;{user?.username} {user?.username === auth?.user?.username && '(You)'}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='col-md-12 col-lg-10 col-xl-8'>
                    <Editor />
                </div>
            </div>

            <Modal title={"Add Collaborator"} modalId={"addCollaborator"} content={
                <>
                    <div className='col-md-12'>
                        <p className='lead text-xl'>Enter the email of the user you want to add as a collaborator</p>
                    </div>
                    <div className="mb-3 d-flex justify-content-end">
                        <input
                            type="text"
                            value={collaboratorEmail}
                            onChange={(e) => setCollaboratorEmail(e.target.value)}
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder={"Email"}
                        />
                        <button type="button" className="btn btn-secondary ms-2" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleAddCollaborator} type="button" className="btn btn-primary ms-2">Add Collaborator</button>
                    </div>
                </>
            } />

            <Modal title={"Collaborators"} modalId={"collaborators"} content={
                <>
                    <ul className="list-group">
                        <li className="list-group-item active" aria-current="true">
                            <i className="bi bi-person-check-fill"></i>&nbsp;Collaborators
                        </li>
                        {collaborators?.map((user, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between">
                                <span><i className="bi bi-person"></i>&nbsp;{user?.email}</span>
                            </li>
                        ))}
                    </ul>
                </>
            } />

        </div >
    );
};

export default EditDocument;
