import sequelize from '../db/connection';
import { CommentModel, UserModel, ImageModel, CommentReactionModel } from '../models/index';
import BaseRepository from './base.repository';


const likeCase = bool => `CASE WHEN "postReactions"."isLike" = ${bool} THEN 1 ELSE 0 END`;
const dislikeCase = bool => `CASE WHEN "postReactions"."isLike" = ${bool} THEN 1 ELSE 0 END`;

class CommentRepository extends BaseRepository {
    getCommentById(id) {
        return this.model.findOne({
            group: [
                'comment.id',
                'user.id',
                'user->image.id'
            ],
            where: { id },
            include: [{
                model: UserModel,
                attributes: ['id', 'username'],
                include: {
                    model: ImageModel,
                    attributes: ['id', 'link']
                }
            }]
        });
    }
}

export default new CommentRepository(CommentModel);
