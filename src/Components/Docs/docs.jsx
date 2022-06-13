import React, { useEffect, useRef } from 'react';
import './docs.css'
import Modal from '../Modal/Modal'
import { addDoc, collection, onSnapshot } from 'firebase/firestore';

export default function Docs ({
    database
}) {
    const state = React.useState;
    const [title, setTitle] = state('');
    const [open, setOpen] = state(false);
    const [docsData, setDocsData] = state([]);

    const handleOpen = (status) => setOpen(status);
    const isMounted = useRef();
    
	const collectionRef = collection(database, 'docsData')

    const addData = () => {
        addDoc(collectionRef, {
            title: title
        })
        .then(() => {
            alert("data added");
            handleOpen(false)
        })
        .catch(() => {
            alert("Failed to add data")
        })
    }

    const getData = () => {
        onSnapshot(collectionRef, (data) => {
            setDocsData(data.docs.map((doc) =>{
                return {...doc.data(), id: doc.id}
            }))
        })
    }

    useEffect(() => {
        if (isMounted.current){
            return
        }
        isMounted.current = true;
        getData()
    }, [] )

    return (
        <div className='docs-main'>
            <h1>Doc-Luck</h1>
            <button className='add-doc' onClick={handleOpen}>
                Add a Document
            </button>
            <div className="display-list">
                {docsData.map((doc) => {
                    return(
                        <div>
                            <p>{doc.title}</p>
                        </div>
                    )
                })}
            </div>

            <Modal 
            open={open} setOpen={setOpen} 
            title={title} setTitle={setTitle} 
            addData={addData} 
            />
        </div>
    );
}