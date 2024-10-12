import React, { useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useSupplier } from '../../context/supplierContext';
import QuillCursors from 'quill-cursors'; // Import the cursor plugin

Quill.register('modules/cursors', QuillCursors); // Register the cursors module

const Editor = () => {
    const { darkMode, setQuill } = useSupplier(); // Get darkMode from context

    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return;
        wrapper.innerHTML = ''; // Clear the wrapper content

        const editor = document.createElement('div');
        editor.style.minHeight = '30em';
        editor.style.maxHeight = '80em';
        editor.style.borderRadius = '10px';

        // Apply dark or light theme styles dynamically based on darkMode
        if (darkMode) {
            editor.classList.add('bg-dark', 'text-white');
            editor.style.color = 'white';
        } else {
            editor.classList.add('bg-light', 'text-black');
            editor.style.color = 'black';
        }

        wrapper.append(editor); 

        // Initialize Quill with the cursor module
        const q = new Quill(editor, {
            theme: 'snow',
            modules: {
                cursors: true, // Enable the cursor module
                toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    ['image', 'code-block']
                ]
            }
        });

        // Set the Quill instance in context
        q.disable(); 
        q.setText('Loading...'); 
        setQuill(q);
    }, [darkMode, setQuill]); 

    return <div className="container" ref={wrapperRef}></div>;
};

export default Editor;
