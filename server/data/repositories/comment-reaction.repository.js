import { CommentReactionModel, CommentModel } from '../models/index';
import BaseRepository from './base.repository';

class CommentReactionRepository extends BaseRepository {
    getCommentReaction(userId, commentId) {
        return this.model.findOne({
            group: [
                'commentReaction.id',
                'comment.id'
            ],
            where: { userId, commentId },
            include: [{
                model: CommentModel,
                attributes: ['id', 'userId']
            }]
        });
    }

    getLikeReaction(userId, commentId) {
        return this.model.findOne({
            group: [
                'commentReaction.id',
                'comment.id'
            ],
            where: { userId, commentId },
            include: [{
                model: CommentModel,
                attributes: ['id', 'userId']
            }]
        });
    }

    // getDislikeReaction(userId, postId) {
    //     return this.model.findOne({
    //         group: [
    //             'postReaction.id',
    //             'post.id'
    //         ],
    //         where: { userId, postId },
    //         include: [{
    //             model: PostModel,
    //             attributes: ['id', 'userId']
    //         }]
    //     });
    // }
}

export default new CommentReactionRepository(CommentReactionModel);