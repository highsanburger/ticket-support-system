import React from 'react'
import { useSelector } from 'react-redux';
const AdminPannel = () => {
    const { token } = useSelector((state) => state.auth);
    const [category, setCategory] = React.useState({
        name: '',
        description: ''
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category.name || !category.description) {
            return;
        }
        console.log(category);
       

    }
    return (
       hey
    )
}

export default AdminPannel