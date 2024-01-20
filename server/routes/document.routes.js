import express from 'express';

import { createDocument, getAllRespectedUserDocuments, getSingleUserDocument, updateDocument, deleteDocument } from '../controllers/doc.controller.js';

import validateToken from '../middlewares/auth.middleware.js';

const documentRouter = express.Router();

documentRouter.route('/').get(validateToken, getAllRespectedUserDocuments).post(validateToken, createDocument);
documentRouter.route('/:documentId').get(validateToken, getSingleUserDocument).patch(validateToken, updateDocument).delete(validateToken, deleteDocument);

export default documentRouter;