import callWebApi from 'src/helpers/webApiHelper';
// import { compose } from 'node_modules/redux/index';

export const addComment = async (request) => {
    const response = await callWebApi({
        endpoint: '/api/comments',
        type: 'POST',
        request
    });
    return response.json();
};

export const getComment = async (id) => {
    const response = await callWebApi({
        endpoint: `/api/comments/${id}`,
        type: 'GET'
    });
    return response.json();
};

export const likeComment = async (commentId) => {
    const response = await callWebApi({
        endpoint: '/api/comments/react',
        type: 'PUT',
        request: {
            commentId,
            isLike: true
        }
    });
    return response.json();
};

export const dislikeComment = async (commentId) => {
    const response = await callWebApi({
        endpoint: '/api/comments/react',
        type: 'PUT',
        request: {
            commentId,
            isLike: false
        }
    });
    return response.json();
}
