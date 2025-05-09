const updateSearchParams = (searchParams, updates) => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '') {
            newSearchParams.delete(key);
        } else {
            newSearchParams.set(key, value);
        };
    });
    
    return newSearchParams;
};

export { updateSearchParams };