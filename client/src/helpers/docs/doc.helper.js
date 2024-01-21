import { API } from "../config";


export const createNewDoc = async (docTitle, token) => {
    try{
        const res = await fetch(`${API}/documents`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title: docTitle,
                isPublic: false,
            }),
    
        });

        const data = await res.json();

        return {status: res.status, data, message: data.message};
    }catch(err){
        console.log(err);
        return {status: 500, message: err.message}
    }
};

export const getAllLoggedInUserDocs = async (token) => {
    try{

        const res = await fetch(`${API}/documents`, {

            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();

        return {status: res.status, data, message: data.message};

    }catch(error){
        console.log(error);
        return {status: 500, message: error.message}
    }
}

export const deleteTheDoc = async (docId, token) => {


    try{
        const res = await fetch(`${API}/documents/${docId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();

        return {status: res.status, data, message: data.message};
    }catch(error){
        console.log(error);
        return {status: 500, message: error.message}
    }
}

export const addCollaboratorToDoc = async (docId, collaboratorEmail, token) => {

    try{
        const res = await fetch(`${API}/documents/add-collaborator/${docId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                collaboratorEmail: collaboratorEmail
            })
        });

        const data = await res.json();

        return {status: res.status, data, message: data.message};
    }catch(error){
        console.log(error);
        return {status: 500, message: error.message}
    }
}

export const getAllCollaborators = async (docId, token) => {
    try{
        const res = await fetch(`${API}/documents/get-all-collaborators/${docId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        return {status: res.status, data, message: data.message};
    }catch(error){
        console.log(error);
        return {status: 500, message: error.message}
    }
}