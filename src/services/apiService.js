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
    const BASE_URL = 'http://localhost:3000';

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
        getSummary: () => request('/profiles/summary', 'GET', null, true),
        getComments: (searchParams) => 
            request(`/profiles/comments${searchParams ? `?${searchParams.toString()}` : ''}`, 'GET', null, true),
        getPostsMetaData: (searchParams) => 
            request(`/profiles/posts${searchParams ? `?${searchParams.toString()}` : ''}`, 'GET', null, true),
        createPost: (title) => request('/posts', 'POST', { title }, true),
        deletePost: (postId) => request(`/posts/${postId}`, 'DELETE', null, true),
        getPost: (postId) => request(`/posts/${postId}`, 'GET', null, true),
        updatePost: (postId, { title, content, summary, status }) => 
            request(`/posts/${postId}`, 'PATCH', { title, content, summary, status }, true),
        deleteComment: (commentId) => request(`/comments/${commentId}`, 'DELETE', null, true),
    };
};

const API = createAPIService();

export default API;