import orm from '../db/connection';
import associate from '../db/associations';

const User = orm.import('./user');
const Post = orm.import('./post');
const PostReaction = orm.import('./post-reaction');
const Comment = orm.import('./comment');
const Image = orm.import('./image');
const CommentReaction = orm.import('./comment-reaction')

associate({
    User,
    Post,
    PostReaction,
    Comment,
    Image,
    CommentReaction
});

export {
    User as UserModel,
    Post as PostModel,
    PostReaction as PostReactionModel,
    Comment as CommentModel,
    Image as ImageModel,
    CommentReaction as CommentReactionModel
};
