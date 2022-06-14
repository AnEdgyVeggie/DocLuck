import React, { useRef, collectionRef, useEffect } from 'react';
import './EditDocs.css';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { updateDoc, collection, doc, onSnapshot } from 'firebase/firestore'
import 'react-quill/dist/quill.snow.css';
import { database } from '../Firebase/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';

export default function EditDocs() {
    const [docsDescript, setDocsDescript] = React.useState('');
    const [docsTitle, setDocsTitle] = React.useState('')

    const collectionRef = collection(database, 'docsData')
    let params = useParams();
    const isMounted = useRef();
    const navigate = useNavigate();

    const getQuillData = (value) => {
        setDocsDescript(value);
    }

    const getData = () => {
        const document = doc(collectionRef, params.id)
        onSnapshot(document, (docs) => {
            setDocsTitle(docs.data().title)
            setDocsDescript(docs.data().docsDescript)
        })
    }

    useEffect(() => {
        if (isMounted.current){
            return;
        }
        isMounted.current = true;
        getData();
    })

    useEffect(() => {
        const updateDocsData = setTimeout(() => {
            const document = doc(collectionRef, params.id)
            updateDoc(document, {
                docsDescript: docsDescript
            })
            .then(() => {
                toast.success("Document Saved", {
                    autoClose: 2000
                })
            })
            .catch(() => {
                toast.error("Failed to Save Document", {
                    autoClose: 2000
                })
            })

        }, 1000)
        return () => clearTimeout(updateDocsData)
    }, [docsDescript])

    const returnHome = () => {
        navigate(`/`)
    }

    return (    
        <div>
            <h1>{docsTitle}</h1>
            <div className='text-editor'>
                <ReactQuill 
                className='quill'
                value={docsDescript || ''} 
                onChange={getQuillData} />
            </div>
            <ToastContainer />
            <button onClick={returnHome} >Return Home</button>
        </div>
    )
}