import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';

function Categories() {
    const state = useContext(GlobalState)
    console.log(state)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createCategory = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
              
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
                console.log(res)
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async id =>{
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="categories">
            <form onSubmit={createCategory}>
                <TextField id="outlined-basic" label="Category" variant="outlined"
                    type="text" name="category" value={category} required
                    onChange={e => setCategory(e.target.value)} fullWidth/>
                <button type="submit" className='categories-add'>{onEdit? "Update" : "Create"}</button>
            </form>

            <div className="categories-column">
                {
                    categories.map(category => (
                        <div className="categories-column-row" key={category._id}>
                            <p className='categories-column-name'>{category.name}</p>
                            <div>
                                <button className='categories-edit-delete categories-edit' onClick={() => editCategory(category._id, category.name)}>Edit</button>
                                <button className='categories-edit-delete categories-delete' onClick={() => deleteCategory(category._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories
