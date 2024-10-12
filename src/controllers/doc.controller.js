import DocumentModel from "../models/documents.model.js";
import User from "../models/user.model.js";

export const createDocument = async (req, res) => {

    try {
        const { title, isPublic } = req.body;

        const doesDocumentExist = await DocumentModel.findOne({ title });

        if (doesDocumentExist) return res.status(400).json({ message: `Document with title : ${title} already exists` });


        const noOfDocuments = await DocumentModel.countDocuments({ owner: req.user.id });

        if (noOfDocuments >= 3) return res.status(400).json({ message: `You can't create more than 3 documents` });

        const newDocument = await DocumentModel.create({ title, isPublic, owner: req.user.id });

        res.status(201).json({ document: newDocument, message: `Document with title : ${title} created successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const getAllRespectedUserDocuments = async (req, res) => {

    try {
        const documents = await DocumentModel.find({
            $or: [
                { owner: req.user.id },
                { collaborators: { $elemMatch: { $eq: req.user.id } } }
            ]
        }).populate("owner", "username").populate("collaborators", "username");
        res.status(200).json({ documents, message: `All documents fetched successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const getSingleUserDocument = async (req, res) => {

    try {
        const { documentId } = req.params;
        const document = await DocumentModel.findById(documentId).populate("owner", "username").populate("collaborators", "username");
        res.status(200).json({ document });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const getDocThroughSocket = async (id) => {
    
        try {
            const document = await DocumentModel.findById(id);
            return document;
        } catch (error) {
            console.log(error);
        }

}

export const updateDocument = async (req, res) => {

    const { documentId } = req.params;

    try {
        const doesDocumentExist = await DocumentModel.findById(documentId);

        if (!doesDocumentExist) return res.status(404).json({ message: `Document with id : ${documentId} doesn't exist` });

        if (doesDocumentExist.owner.toString() !== req.user.id) return res.status(401).json({ message: `You are not authorized to update this document` });

        const { content } = req.body;

        const updatedDocument = await DocumentModel.findByIdAndUpdate(documentId, { content }, { new: true });

        res.status(200).json({ document: updatedDocument, message: `Document with id : ${documentId} updated successfully` });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteDocument = async (req, res) => {

    const { documentId } = req.params;

    try {

        const doesDocumentExist = await DocumentModel.findById(documentId);


        if (!doesDocumentExist) return res.status(404).json({ message: `Document with id : ${documentId} doesn't exist` });

        if (doesDocumentExist.owner.toString() !== req.user.id) return res.status(401).json({ message: `You are not authorized to delete this document` });

        await DocumentModel.findByIdAndDelete(documentId);

        res.status(200).json({ message: `Document: ${doesDocumentExist?.title || ''} deleted successfully` });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addCollaborator = async (req, res) => {

    try {
        const { documentId } = req.params;
        const { collaboratorEmail } = req.body;

        const doesDocumentExist = await DocumentModel.findById(documentId);

        if (!doesDocumentExist) return res.status(404).json({ message: `Document with id : ${documentId} doesn't exist` });

        if (doesDocumentExist.owner.toString() !== req.user.id) return res.status(401).json({ message: `You are not authorized to add collaborator to this document` });

        const doesCollaboratorExist = await User.findOne({ email: collaboratorEmail });
        if (!doesCollaboratorExist) return res.status(404).json({ message: `Collaborator with email : ${collaboratorEmail} doesn't exist` });

        if (doesDocumentExist.owner.toString() === doesCollaboratorExist._id.toString()) return res.status(400).json({ message: `${collaboratorEmail} is the owner of this document` });


        if (doesDocumentExist.collaborators.includes(doesCollaboratorExist._id)) return res.status(400).json({ message: `${collaboratorEmail} is already a collaborator` });

        doesDocumentExist.collaborators.push(doesCollaboratorExist._id);
        const updatedDocument = await doesDocumentExist.save();

        res.status(200).json({ document: updatedDocument, message: `Sucssesfully added ${doesCollaboratorExist.username} as a collaborator` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getAllCollaborators = async (req, res) => {

    try{
        const { documentId } = req.params;

        const doesDocumentExist = await DocumentModel.findById(documentId).populate("collaborators", "username");

        if (!doesDocumentExist) return res.status(404).json({ message: `Document with id : ${documentId} doesn't exist` });


        res.status(200).json({ collaborators: doesDocumentExist.collaborators, message: `All collaborators fetched successfully` });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}