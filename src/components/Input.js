import { TextField } from '@mui/material';

const Input = ({ label, name, onChange, value, error, type}) => {

    return(
        <>
            <TextField 
                label={label}
                variant="standard" 
                type={type}
                name={name}
                onChange={onChange} 
                value={value}
                error={Boolean(value && error)}
                helperText={value && error}/>
            <br />
        </>
    )
}

export default Input;