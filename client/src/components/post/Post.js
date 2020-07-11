import React, { useEffect } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions';

const Post = props => {
  const { post: { post, loading }, getPost, match } = props;

  useEffect(() => { getPost(match.params.id) }, [getPost, match.params.id]);

  if (!post || loading) return <Spinner />;

  return (
    <React.Fragment>
      <Link to="/posts" className="btn">Back To Posts</Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map(comment => <CommentItem key={comment._id} comment={comment} postId={post._id} />)}
      </div>
    </React.Fragment>
  );
};

Post.propTypes = {
  getPost: PropType.func.isRequired,
  post: PropType.object.isRequired
}

const mapStateToProps = state => {
  return { post: state.post };
}

export default connect(mapStateToProps, { getPost })(Post);