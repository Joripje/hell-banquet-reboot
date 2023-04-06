
import { Search } from "@mui/icons-material"
import { Button, Modal, Box, TextField, Icon } from '@mui/material'

function ArticleCreateModal(params) {
    const { isOpen, onClose } = params

    const placeholder = '검색해!'

    async function createArticle(event) {
        event.preventDefault()
        console.log("hello")
    } 

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box component="form" sx={styleForBox}>
                <TextField rows={1} InputProps={{ sx: { fontSize: 20 }}} multiline placeholder={placeholder} sx={styleForTextField} /> 
                <Button type="submit" onClick={createArticle} variant='contained'>
                    <Icon component={Search}/>
                </Button>
            </Box>
        </Modal>
    )
}

const styleForBox = {
    position: 'absolute',
    top: '13%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '60%',
    bgcolor: '#B8DDFF',
    borderRadius: 10,
    boxShadow: 24,
    p: 3,
};

const styleForTextField = {
    bgcolor: 'white', 
    width: '100%',
    overflowY: 'auto',
    borderRadius: '20px',
    
}

export default ArticleCreateModal