import React from 'react';
import PropTypes from 'prop-types';
import { Comment as CommentUI, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { getUserImgLink } from 'src/helpers/imageHelper';

import styles from './styles.module.scss';

const Comment = (props) => {
    const { comment: { id, body, createdAt, user, likeCount, dislikeCount } } = props;
    const date = moment(createdAt).fromNow();
    return (
        <CommentUI className={styles.comment}>
            <CommentUI.Avatar src={getUserImgLink(user.image)} />
            <CommentUI.Content>
                <CommentUI.Author as="a">
                    {user.username}
                </CommentUI.Author>
                <CommentUI.Metadata>
                    {date}
                </CommentUI.Metadata>
                <CommentUI.Text>
                    {body}
                </CommentUI.Text>
                <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => { props.likeComment(id) }}>
                    <Icon name="thumbs up" />
                    {likeCount || 0}
                </Label>
                <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => props.dislikeComment(id)}>
                    <Icon name="thumbs down" />
                    {dislikeCount || 0}
                </Label>
            </CommentUI.Content>
        </CommentUI>
    );
};

Comment.propTypes = {
    comment: PropTypes.objectOf(PropTypes.any).isRequired,
    likeComment: PropTypes.func.isRequired,
    dislikeComment: PropTypes.func.isRequired,
};

export default Comment;
