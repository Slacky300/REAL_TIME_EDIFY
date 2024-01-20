import DocumentModel from "../models/documents.model.js";

export const createDocument = async (req, res) => {

    try {
        const { title, isPublic } = req.body;

        const newDocument = await DocumentModel.create({ title, isPublic, owner: req.userId });

        res.status(201).json({ document: newDocument, message: `Document with title : ${title} created successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const getAllRespectedUserDocuments = async (req, res) => {

    try {
        const documents = await DocumentModel.find({ owner: req.user.id }).populate("owner", "username").populate("collaborators", "username");
        res.status(200).json({ documents });
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

export const updateDocument = async (req, res) => {

    const { documentId } = req.params;

    try {
        const doesDocumentExist = await DocumentModel.findById(documentId);

        if (!doesDocumentExist) return res.status(404).json({ message: `Document with id : ${documentId} doesn't exist` });

        if (doesDocumentExist.owner.toString() !== req.user.id) return res.status(401).json({ message: `You are not authorized to update this document` });

        const {content} = req.body;

        const updatedDocument = await DocumentModel.findByIdAndUpdate(documentId, {content}, {new: true});

        res.status(200).json({document: updatedDocument, message: `Document with id : ${documentId} updated successfully`});


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteDocument = async (req, res) => {

    const { documentId } = req.params;

    try{

        const doesDocumentExist = await DocumentModel.findById(documentId);

        if(!doesDocumentExist) return res.status(404).json({message: `Document with id : ${documentId} doesn't exist`});

        if(doesDocumentExist.owner.toString() !== req.user.id) return res.status(401).json({message: `You are not authorized to delete this document`});

        await DocumentModel.findByIdAndDelete(documentId);

        res.status(200).json({message: `Document with id : ${documentId} deleted successfully`});

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}