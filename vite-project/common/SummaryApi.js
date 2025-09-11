export const baseURL = "http://localhost:5000"

const SummaryApi = {
    register : {
        method: 'POST',
        url: 'http://localhost:5000/api/users/register', // Adjust the URL if needed
        headers: {
            'Content-Type': 'application/json',
        },
    },
    login : {
        url : '/api/user/login',
        method : 'post'
    },
}

export default SummaryApi