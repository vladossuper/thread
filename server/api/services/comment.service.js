import commentRepository from '../../data/repositories/comment.repository';
import commentReactionRepository from '../../data/repositories/comment-reaction.repository';


export const create = (userId, comment) => commentRepository.create({
    ...comment,
    userId
});

export const setReaction = async (userId, { commentId, isLike }) => {
    // define the callback for future use as a promise

    let diff = {
        likesDiff: 0,
        dislikesDiff: 0
    };

    const updateOrDelete = react => {
        if (isLike && react.isLike) {
            diff.likesDiff = -1;
            return commentReactionRepository.deleteById(react.id);
        } else if (isLike && !react.isLike) {
            diff.likesDiff = 1;
            diff.dislikesDiff = -1;
            return commentReactionRepository.updateById(react.id, { isLike: true });
        } else if(!isLike && react.isLike) {
            diff.likesDiff = -1;
            diff.dislikesDiff = 1;
            return commentReactionRepository.updateById(react.id, { isLike: false });
        } else if (!isLike && !react.isLike) {
            diff.dislikesDiff = -1;
            return commentReactionRepository.deleteById(react.id);
        }
    };
        
    const reaction = await commentReactionRepository.getCommentReaction(userId, commentId);

    if(reaction) {
        await updateOrDelete(reaction);
    } else {
        await commentReactionRepository.create({ userId, commentId, isLike });
        if (isLike) {
            diff.likesDiff = 1;
        } else {
            diff.dislikesDiff = 1;
        }
    }

    // the result is an integer when an entity is deleted

    return diff;
};

// export const getCommentById = id => commentRepository.getCommentById(id);
