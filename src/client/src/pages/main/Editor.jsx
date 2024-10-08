import React, { useCallback } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { useSupplier } from '../../context/supplierContext'

const Editor = () => {

    const {setQuill} = useSupplier();

    let theme = localStorage.getItem('theme');
    
    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return
        wrapper.innerHTML = ''
        const editor = document.createElement('div');
        editor.style.minHeight = '30em';
        editor.style.maxHeight = '80em';
        if(theme == 'dark'){
        editor.classList.add('bg-dark');
        editor.classList.add('text-white');
        editor.style.color = 'white';
        }else{
        editor.classList.add('bg-light');
        editor.classList.add('text-black');
        editor.style.color = 'black';
        }
        editor.style.borderRadius = '10px';
        wrapper.append(editor)
        const q = new Quill(editor, { theme: 'snow' })
        q.disable();
        q.setText('Loading...')
        setQuill(q);
    }, [])

  return (
    <div className="container" ref={wrapperRef}>

    </div>
  )
}

export default Editor