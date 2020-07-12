import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions';

const CommentItem = props => {
  const { postId, comment, auth } = props;

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${comment.user}`}>
          <img
            className="round-img"
            src={comment.avatar}
            alt="Comment author avatar"
          />
          <h4>{comment.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{comment.text}</p>
        <p className="post-date">Posted on <Moment format='DD/MM/YYYY'>{comment.date}</Moment></p>
        {!auth.loading && auth.user._id === comment.user && (
          <button type="button" class="btn btn-danger" onClick={() => props.deleteComment(postId, comment._id)}>
            <i class="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropType.string.isRequired,
  auth: PropType.object.isRequired,
  comment: PropType.object.isRequired,
  deleteComment: PropType.func.isRequired
}

const mapStateToProps = state => {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { deleteComment })(CommentItem);