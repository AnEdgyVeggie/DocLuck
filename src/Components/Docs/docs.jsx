import React, { useEffect, useRef } from 'react';
import './docs.css'
import Modal from '../Modal/Modal'
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';

export default function Docs ({
    database
}) {
    let navigate = useNavigate();
    const state = React.useState;
    const [title, setTitle] = state('');
    const [open, setOpen] = state(false);
    const [docsData, setDocsData] = state([]);

    const handleOpen = (status) => setOpen(status);
    const isMounted = useRef();
    
	const collectionRef = collection(database, 'docsData')

    const addData = () => {
        addDoc(collectionRef, {
            title: title,
        })
        .then(() => {
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

    const getID = (id) => {
        navigate(`/editDocs/${id}`)
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
											<div className='select-doc' 
											onClick={() => getID(doc.id)}>
													<h6>{doc.title} 
													<div className='descript' dangerouslySetInnerHTML={{__html: doc.docsDescript}}
														/>
														</h6>
													
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