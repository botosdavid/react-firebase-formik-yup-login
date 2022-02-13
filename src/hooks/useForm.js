import { useState } from 'react';

const useForm = () => {
    const [inputValue, setInputValue] = useState('');
    const handleChange = (e) => {
        e.preventDefault();
        setInputValue(e.target.value);
    }
    return [inputValue, handleChange];
}

export default useForm;