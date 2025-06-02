import { useState } from 'react';
import styles from './SearchToolBar.module.css';

function SearchToolbar({ initialParams, sortOptions=[], filterGroups=[], onParamChange }) {
    const [searchValue, setSearchValue] = useState(initialParams.search);

    const handleSearchSubmit = (value) => {
        onParamChange({ search: value });
    };

    const handleSortChange = (value) => {
        const [orderBy, orderDir] = value.split(':');
        onParamChange({ orderBy, orderDir });
    };

    const handleFilterChange = (filterKey, value) => {
        onParamChange({ [filterKey]: value });
    };

    return (
        <div className={styles.searchToolBar}>
            <div className={styles.searchSection}>
                <input 
                    value={searchValue} 
                    type='text' 
                    name='search' 
                    className='font-sm' 
                    placeholder='Search' 
                    onChange={(e) => setSearchValue(e.target.value)} 
                />
                <button className='font-xs' onClick={() => handleSearchSubmit(searchValue)}><span>Find</span></button>
            </div>

            {sortOptions.length > 0 && (
                <div>
                    <select 
                        name='sorting' 
                        value={`${initialParams?.orderBy}:${initialParams?.orderDir}`}
                        className='font-xs'
                        onChange={(e) => handleSortChange(e.target.value)}
                    >
                        {sortOptions.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>                            
                        ))}
                    </select>
                </div>
            )}
            
            {filterGroups.length > 0 && filterGroups.map(({key, label, options}) => (
                <div key={key}>
                    <select 
                        name={key}
                        value={initialParams?.[key]}
                        className='font-xs'
                        onChange={(e) => handleFilterChange(key, e.target.value)}
                    >
                        <option value=''>{label}</option>
                        {options.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>  
            ))}               
        </div>
    );
};

export default SearchToolbar;