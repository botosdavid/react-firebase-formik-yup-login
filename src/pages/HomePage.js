import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';

const HomePage = () => {
    const { user, signOut } = useContext(AuthContext);

    return (
        <Box sx={{ height: '100vh', backgroundColor: '#e8eaf6', pt: '5rem'}}>
            <Box spacing={2} sx={{width: 1/2, mx: 'auto', backgroundColor: 'white', p: '5rem'}}>
            <Typography variant='h4'>Welcome {user ? JSON.stringify(user.email) : ''}</Typography>
            <Button onClick={signOut}>Logout</Button>
            </Box>
        </Box>

    )
}

export default HomePage;