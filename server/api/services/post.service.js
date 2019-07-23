import postRepository from '../../data/repositories/post.repository';
import postReactionRepository from '../../data/repositories/post-reaction.repository';

export const getPosts = filter => postRepository.getPosts(filter);

export const getPostById = id => postRepository.getPostById(id);

export const create = (userId, post) => postRepository.create({
    ...post,
    userId
});

export const setReaction = async (userId, { postId, isLike }) => {
    // define the callback for future use as a promise

    let diff = {
        likesDiff: 0,
        dislikesDiff: 0
    };

    const updateOrDelete = react => {
        if (isLike && react.isLike) {
            diff.likesDiff = -1;
            return postReactionRepository.deleteById(react.id);
        } else if (isLike && !react.isLike) {
            diff.likesDiff = 1;
            diff.dislikesDiff = -1;
            return postReactionRepository.updateById(react.id, { isLike: true });
        } else if(!isLike && react.isLike) {
            diff.likesDiff = -1;
            diff.dislikesDiff = 1;
            return postReactionRepository.updateById(react.id, { isLike: false });
        } else if (!isLike && !react.isLike) {
            diff.dislikesDiff = -1;
            return postReactionRepository.deleteById(react.id);
        }
    };
        
    const reaction = await postReactionRepository.getPostReaction(userId, postId);

    if(reaction) {
        await updateOrDelete(reaction);
    } else {
        await postReactionRepository.create({ userId, postId, isLike });
        if (isLike) {
            diff.likesDiff = 1;
        } else {
            diff.dislikesDiff = 1;
        }
    }

    // the result is an integer when an entity is deleted

    return diff;
};
