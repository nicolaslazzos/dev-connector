import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { postLike, deletePost } from '../../actions';

const PostItem = props => {
  const { post, auth } = props;

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${post.user}`}>
          <img
            className="round-img"
            src={post.avatar}
            alt="Post author avatar"
          />
          <h4>{post.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{post.text}</p>
        <p className="post-date">Posted on <Moment format="DD/MM/YYYY">{post.date}</Moment></p>

        {props.showActions && (
          <React.Fragment>
            <button type="button" className="btn btn-light" onClick={() => props.postLike(post._id)}>
              <i className="fas fa-thumbs-up"></i>
              <span>{' '}{post.likes.length}</span>
            </button>
            <Link to={`/posts/${post._id}`} className="btn btn-primary">
              Discussion <span className='comment-count'>{post.comments.length}</span>
            </Link>
            {!auth.loading && post.user === auth.user._id && (
              <button type="button" className="btn btn-danger" onClick={() => props.deletePost(post._id)}>
                <i className="fas fa-times"></i>
              </button>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  post: PropType.object.isRequired,
  auth: PropType.object.isRequired,
  postLike: PropType.func.isRequired,
  deletePost: PropType.func.isRequired
}

const mapStateToProps = state => {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { postLike, deletePost })(PostItem);