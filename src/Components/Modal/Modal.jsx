import * as React from 'react';
import { Typography, Button, Box, Modal } from '@mui/material';
import './Modal.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export default function ModalComponent({
    open,
    setOpen,
    title,
    setTitle,
    addData,
}) {


  const handleClose = () => setOpen(false)

	return(
		<div>
			<Modal
			open={open}
			onCLose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			>
					<Box sx={style}>
							<input 
									placeholder='Add a Title'
									className='add-input'
									onChange={(event) =>  setTitle(event.target.value)}
									value={title}
							/>
							<div className='button-container'>
									<button className='add-docs' 
									onClick={addData}>
											Create
									</button>
							</div>
					</Box>
			</Modal>
		</div>
	);
}