import { Button, Icon, } from "@mui/material"
import { Upload, } from "@mui/icons-material"
import { excelUpload } from "../../api/member";

function ExcelButton(params) {
    const { buttonName } = params
    
    const handleFileUpload = () => {
        const fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('id', 'file-upload');
        fileInput.style.display = 'none';
    
        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            await excelUpload(
                file,
                (data) => {
                    console.log(data)
                },
                (err) => console.log(err)
            )
        });
    
        document.body.appendChild(fileInput);
        fileInput.click();
    };

    const styleForButton = {
        color: '#000000',
        fontWeight: 1000,
        background: '#e5e5e5'
    }
    
    return (
        <>
        <Button style={styleForButton} variant="contained" size="large" onClick={handleFileUpload} >
            {buttonName}
            <Icon component={Upload} />
        </Button>
        <br />
        <br />
        </>
    )
}

export default ExcelButton