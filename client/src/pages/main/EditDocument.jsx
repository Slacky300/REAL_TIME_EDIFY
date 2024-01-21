import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSupplier } from '../../context/supplierContext';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal';
import { addCollaboratorToDoc, getAllCollaborators } from '../../helpers/docs/doc.helper';
import { useAuth } from '../../context/authContext';
import { API } from '../../helpers/config';
import Editor from './Editor';

const EditDocument = () => {

    const [currentUsers, setCurrentUsers] = useState([]); 
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { currentDoc, loading, socket, setCurrentDoc, shouldUpdate, triggerUpdate,quill, setLoading } = useSupplier();
    const [collaboratorEmail, setCollaboratorEmail] = useState('');
    const [collaborators, setCollaborators] = useState([]);
    const { id } = useParams();


    const handleAddCollaborator = async () => {
        setLoading(true);
        const res = await addCollaboratorToDoc(currentDoc?._id, collaboratorEmail, auth?.token).finally(() => setLoading(false));
        if (res?.status === 200) {
            setCollaboratorEmail('');
            document.getElementById('closeTheModal').click();
            toast.success(res?.data?.message);
            triggerUpdate();
        }

        toast.error(res?.data?.message);
    };

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

    }, [auth, currentDoc, shouldUpdate]);

    useEffect(() => {
        const handleSomeoneJoined = (data) => {
            if (data?.username !== auth?.user?.username) {
                
                toast.success(`${data?.username} joined the document`);
            }
            setCurrentUsers(data?.roomUsers);
        };

        const handleSomeoneLeft = (data) => {
            if (data?.username !== auth?.user?.username) {
                toast.error(`${data?.username} left the document`);
            }
            setCurrentUsers(data?.roomUsers);

        };

        if (currentDoc?._id) {
            socket.emit('joinRoom', { roomId:currentDoc?._id, username: auth?.user?.username}, (error) => {
                if (error) {
                    console.error('Error joining room:', error);
                }
            });



            socket.on('someoneJoined', handleSomeoneJoined);
            socket.on('someoneLeft', handleSomeoneLeft);
        }

        return () => {
            if (currentDoc?._id) {
                socket.emit('leaveRoom', { roomId: currentDoc?._id, username: auth?.user?.username }, (error) => {
                    if (error) {
                        console.error('Error leaving room:', error);
                        
                    }
                });
                socket.off('someoneJoined', handleSomeoneJoined);
                socket.off('someoneLeft', handleSomeoneLeft);
            }
        };
    }, [currentDoc, auth?.user?.username]);

    useEffect(() => {
        if(quill == null) return;

        
        socket.once('load-document', document => {
            quill.setContents(document);
            quill.enable();

        })


        socket.emit("get-doc",{ docId: currentDoc?._id}, (error) => {
            if (error) {
                console.error('Error leaving room:', error);    
            }
        })
        
    
    },[quill, currentDoc])

    useEffect(() => {
        if (quill == null) return
    
        const interval = setInterval(() => {
            toast.info('Saving document...')
          socket.emit("save-doc", { docId: currentDoc?._id, data: quill?.getContents() }, (error) => {
            if (error) {
              console.error(error)
            }
          })
        }, 70000)
    
        return () => {
          clearInterval(interval)
        }
      }, [quill])

    useEffect(() => {
        if(quill == null) return;
        const handler = (delta) => {
           if(delta?.username !== auth?.user?.username){
                quill.updateContents(delta?.delta);  
           }
           return;
        }
        socket.on('receive-changes', handler)
        return () => {
            socket.off('receive-changes', handler)
        }
    },[quill])


    useEffect(() => {
        if(quill == null) return;
        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return

            socket.emit('send-changes', { delta, roomId: currentDoc?._id, username: auth?.user?.username },(error) => {
                if (error) {
                    console.error('Error leaving room:', error);
                    
                }
            })
        }
        quill.on('text-change', handler)
        return () => {
            quill.off('text-change', handler)
        }
    }, [quill]);

    


    return (
        <div className='container my-4'>
            <div className='row d-flex'>

                <div className='d-flex justify-content-start'>
                    <button type="button" className="btn btn-warning" onClick={() => navigate(-1)}>Back</button>

                </div>
                <div className='d-flex justify-content-end'>
                    <button type="button" className="btn my-4 btn-primary"
                        data-bs-toggle="modal" data-bs-target={`#${"addCollaborator"}`}
                    >Add Collaborator</button>
                </div>


            </div>
            <div className='row d-flex justify-content-center align-items-center'>
                <div className='col-md-2'>
                    <ul className="list-group">
                        {currentUsers?.map((user, index) => (
                            <li key={index} className="list-group-item">{user?.username}</li>
                        ))}
                    </ul>
                </div>
                <div className='col-md-10'>
                    <Editor />
                </div>
            </div>

            <Modal title={"Add Collaborator"} modalId={"addCollaborator"} content={
                <>
                    <div className='col-md-12'>
                        <p className='lead text-xl'>Enter the email of the user you want to add as a collaborator</p>
                    </div>
                    <div className="mb-3 d-flex justify-content-end">
                        <input type="text" value={collaboratorEmail} onChange={(e) => setCollaboratorEmail(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder={"Email"} />
                        <button type="button" className="btn btn-secondary ms-2" data-bs-dismiss="modal">Close</button>
                        <button type="button" onClick={handleAddCollaborator} className="btn btn-primary ms-2">Add</button>
                    </div>
                </>
            } />
        </div>
    )
}

export default EditDocument