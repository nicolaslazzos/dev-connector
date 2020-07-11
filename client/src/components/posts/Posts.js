import React, { useEffect } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions';

const Posts = props => {
  const { post: { posts, loading }, getPosts } = props;

  useEffect(() => { getPosts() }, [getPosts]);

  if (loading) return <Spinner />;

  return (
    <React.Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
      <PostForm />
      <div className="posts">
        {posts.map(post => <PostItem key={post._id} post={post} />)}
      </div>
    </React.Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropType.func.isRequired,
  post: PropType.object.isRequired
}

const mapStateToProps = state => {
  return { post: state.post };
}

export default connect(mapStateToProps, { getPosts })(Posts);