import React, { useState } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions';

const PostForm = props => {
  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    props.addPost({ text });
    setText('');
  }

  return (
    <div className="post-form" onSubmit={e => onSubmit(e)}>
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1">
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropType.func.isRequired
}

export default connect(null, { addPost })(PostForm);