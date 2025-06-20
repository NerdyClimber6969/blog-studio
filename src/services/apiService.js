class ApiError extends Error {
    constructor({ message, name, statusCode, timestamp, details=null }) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.timestamp = timestamp;
        this.details = details;
    };
};

function createAPIService() {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    async function request(endpoint, method='GET', data=null, includeCredentials=false) {
        const headers = {
            'Content-Type': 'application/json'
        };

        const options = {
            method,
            headers
        };

        if (includeCredentials) {
            options.credentials = 'include';
        };
          
        if (data) {
            options.body = JSON.stringify(data);
        };

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, options);
            const json = await response.json();

            if (!response.ok) {
                throw new ApiError(json.error);
            };

            return json;
        } catch (error) {
            console.error('API request failed:', error.message);
            throw error;
        };
    };

    return {
        logout: () => request('/authen/logout', 'POST', null, true),
        verify: () =>request('/authen/verify', 'GET', null, true),
        getSummary: () => request('/users/summary', 'GET', null, true),
        deleteComment: (commentId) => request(`/users/comments/${commentId}`, 'DELETE', null, true),
        getComments: (searchParams) => request(`/users/comments${searchParams ? `?${searchParams.toString()}` : ''}`, 'GET', null, true),
        createPost: (title) => request('/users/posts', 'POST', { title }, true),
        updatePost: (postId, { title, content, summary, status }) => request(`/users/posts/${postId}`, 'PATCH', { title, content, summary, status }, true),
        getPostsMetaData: (searchParams) => request(`/users/posts${searchParams ? `?${searchParams.toString()}` : ''}`, 'GET', null, true),
        getPost: (postId) => request(`/users/posts/${postId}`, 'GET', null, true),
        deletePost: (postId) => request(`/users/posts/${postId}`, 'DELETE', null, true)
    };
};

const API = createAPIService();

export default API;