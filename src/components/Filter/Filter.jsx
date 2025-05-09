import { useState } from 'react';
import styles from './Filter.module.css';

function Filter({ filters, useStatus=true, onFilterChange }) {
    const [searchValue, setSearchValue] = useState(filters.search);

    const handleSearchChange = (value) => {
        onFilterChange({ search: value });
    };

    const handleSortChange = (value) => {
        const [orderBy, orderDir] = value.split(':');
        onFilterChange({ orderBy, orderDir });
    };

    const handleStatusChange = useStatus && (
        (value) => onFilterChange({ status: value }) 
    );

    return (
        <div className={styles.filter}>
            <div>
                <input 
                    value={searchValue} 
                    type='text' 
                    name='search' 
                    className='font-sm' 
                    placeholder='Search' 
                    onChange={(e) => setSearchValue(e.target.value)} 
                />
                <button className='font-xs' onClick={() => handleSearchChange(searchValue)}><span>Find</span></button>
            </div>
            <div>
                <select 
                    name='sorting' 
                    value={filters.sort}
                    className='font-xs'
                    onChange={(e) => handleSortChange(e.target.value)}
                >
                    <option value='createdAt:asc'>Date of Creation (Asc)</option>
                    <option value='createdAt:desc'>Date of Creation (Desc)</option>
                    <option value='title:asc'>Title (Asc)</option>
                    <option value='title:desc'>Title (Desc)</option>
                </select>
            </div>

            {useStatus && (
                <div>
                    <select 
                        name='status' 
                        value={filters.status}
                        defaultValue='all'
                        className='font-xs'
                        onChange={(e) => handleStatusChange(e.target.value)}
                    >
                        <option value='published'>Published</option>
                        <option value='drafted'>Drafted</option>
                        <option value=''>All</option>
                    </select>
                </div>  
            )}    
        </div>
    );
};

export default Filter;