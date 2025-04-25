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
                const error = new Error('request fail');
                error.errors = json.errors;
                throw error;
            };

            return json;
        } catch (error) {
            console.error('API request failed:', error.message);
            throw error;
        };
    };

    return {
        signUp: (data) => request('/authen/sign-up', 'POST', data),
        login: (data) => request('/authen/login', 'POST', data, true),
        logout: () => request('/authen/logout', 'POST', null, true),
        verify: () =>request('/authen/verify', 'GET', null, true),
        getProfile: () => request('/profiles', 'GET', null, true),
        getPosts: (url) => request(url, 'GET', null, true),
        createPost: (data) => request('/posts', 'POST', data, true),
        deletePost: (postId) => request(`/posts/${postId}`, 'DELETE', null, true),
        getPost: (postId) => request(`/posts/${postId}`, 'GET', null, true),
        updatePost: (postId, data) => request(`/posts/${postId}`, 'PATCH', data, true),
        deleteComment: (commentId) => request(`/comments/${commentId}`, 'DELETE', null, true),
    };
};

const API = createAPIService();

export default API;