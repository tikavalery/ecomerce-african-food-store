import React, {useContext} from 'react'
import { GlobalState } from '../../../GlobalState'
import "./Filters.css"
import TextField from '@material-ui/core/TextField';


function Filters() {

    
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search
 
    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu">
            <div className="all-products">

                <select name="category" value={category} onChange={handleCategory} className ="filter_menu_select" >
                    <option value=''>Show All Products</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id} className ="options-filter">
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div>  
                <TextField
                    type="text"
                    label="Search Product Name!"
                    variant="outlined"
                    value={search} 
                    onChange={e => setSearch(e.target.value.toLowerCase())}
                    className="filter-search"/>
            </div>
           

            <div className="row sort">
                <span className='sort-name'>Sort By: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort=-price'>Price: Hight-Low</option>
                    <option value='sort=price'>Price: Low-Hight</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
