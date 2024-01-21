import React, { useCallback } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { useSupplier } from '../../context/supplierContext'

const Editor = () => {

    const {setQuill} = useSupplier();
    
    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return
        wrapper.innerHTML = ''
        const editor = document.createElement('div');
        editor.style.minHeight = '30em';
        editor.style.maxHeight = '80em';
        wrapper.append(editor)
        const q = new Quill(editor, { theme: 'snow' })
        setQuill(q);
    }, [])

  return (
    <div className="container" ref={wrapperRef}>

    </div>
  )
}

export default Editor