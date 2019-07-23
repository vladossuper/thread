import * as postService from 'src/services/postService';
import * as commentService from 'src/services/commentService';
import {
    ADD_POST,
    LOAD_MORE_POSTS,
    SET_ALL_POSTS,
    SET_EXPANDED_POST,
    SET_EXPANDED_COMMENT,
    SET_ALL_COMMENTS
} from './actionTypes';

const setPostsAction = posts => ({
    type: SET_ALL_POSTS,
    posts
});

const addMorePostsAction = posts => ({
    type: LOAD_MORE_POSTS,
    posts
});

const addPostAction = post => ({
    type: ADD_POST,
    post
});

const setExpandedPostAction = post => ({
    type: SET_EXPANDED_POST,
    post
});

const setExpandedCommentAction = comment => ({
    type: SET_EXPANDED_COMMENT,
    comment
});

const setCommentsAction = comments => ({
    type: SET_ALL_COMMENTS,
    comments
});

export const loadPosts = filter => async (dispatch) => {
    const posts = await postService.getAllPosts(filter);
    dispatch(setPostsAction(posts));
};

export const loadMorePosts = filter => async (dispatch) => {
    const posts = await postService.getAllPosts(filter);
    dispatch(addMorePostsAction(posts));
};

export const applyPost = postId => async (dispatch) => {
    const post = await postService.getPost(postId);
    dispatch(addPostAction(post));
};

export const addPost = post => async (dispatch) => {
    const { id } = await postService.addPost(post);
    const newPost = await postService.getPost(id);

    console.log(newPost);
    dispatch(addPostAction(newPost));
};

export const toggleExpandedPost = postId => async (dispatch) => {
    const post = postId ? await postService.getPost(postId) : undefined;
    dispatch(setExpandedPostAction(post));
};

export const likePost = postId => async (dispatch, getRootState) => {
    const diff = await postService.likePost(postId);

    const mapLikes = post => ({
        ...post,
        dislikeCount: Number(post.dislikeCount) + diff.dislikesDiff, // diff is taken from the current closure
        likeCount: Number(post.likeCount) + diff.likesDiff // diff is taken from the current closure
    });
    const { posts: { posts, expandedPost } } = getRootState();
    const updated = posts.map(post => (post.id !== postId ? post : mapLikes(post)));

    dispatch(setPostsAction(updated));

    if (expandedPost && expandedPost.id === postId) {
        dispatch(setExpandedPostAction(mapLikes(expandedPost)));
    }
};

export const dislikePost = postId => async (dispatch, getRootState) => {
    const diff = await postService.dislikePost(postId);


    const mapDislikes = post => ({
        ...post,
        dislikeCount: Number(post.dislikeCount) + diff.dislikesDiff, // diff is taken from the current closure
        likeCount: Number(post.likeCount) + diff.likesDiff
    });

    const { posts: { posts, expandedPost } } = getRootState();
    const updated = posts.map(post => (post.id !== postId ? post : mapDislikes(post)));

    dispatch(setPostsAction(updated));

    if (expandedPost && expandedPost.id === postId) {
        dispatch(setExpandedPostAction(mapDislikes(expandedPost)));
    }
};

export const addComment = request => async (dispatch, getRootState) => {
    const { id } = await commentService.addComment(request);
    const comment = await commentService.getComment(id);

    const mapComments = post => ({
        ...post,
        commentCount: Number(post.commentCount) + 1,
        comments: [...(post.comments || []), comment] // comment is taken from the current closure
    });

    const { posts: { posts, expandedPost } } = getRootState();
    const updated = posts.map(post => (post.id !== comment.postId
        ? post
        : mapComments(post)));

    dispatch(setPostsAction(updated));

    if (expandedPost && expandedPost.id === comment.postId) {
        dispatch(setExpandedPostAction(mapComments(expandedPost)));
    }
};

// export const changePost = postId => async (dispatch) => {
//     const post = postId ? await postService.getPost(postId) : undefined;
//     dispatch(setExpandedPostAction(post));
// };


export const likeComment = commentId => async (dispatch, getRootState) => {
    const diff = await commentService.likeComment(commentId);

    const mapLikes = comment => ({
        ...comment,
        dislikeCount: Number(comment.dislikeCount || 0) + diff.dislikesDiff, // diff is taken from the current closure
        likeCount: Number(comment.likeCount || 0) + diff.likesDiff // diff is taken from the current closure
    });
    const state = getRootState();
    const comments = state.posts.expandedPost.comments;

    const updated = comments.map(comment => (comment.id !== commentId ? comment : mapLikes(comment)));

    let newExpandedPost = state.posts.expandedPost;
    newExpandedPost.comments = updated;

    dispatch(setExpandedPostAction(newExpandedPost));
};

export const dislikeComment = commentId => async (dispatch, getRootState) => {
    const diff = await commentService.dislikeComment(commentId);


    const mapDislikes = comment => ({
        ...comment,
        dislikeCount: Number(comment.dislikeCount || 0) + diff.dislikesDiff, // diff is taken from the current closure
        likeCount: Number(comment.likeCount || 0) + diff.likesDiff
    });

    const state = getRootState();
    const comments = state.posts.expandedPost.comments;

    const updated = comments.map(comment => (comment.id !== commentId ? comment : mapDislikes(comment)));

    let newExpandedPost = state.posts.expandedPost;
    newExpandedPost.comments = updated;

    dispatch(setExpandedPostAction(newExpandedPost));
};