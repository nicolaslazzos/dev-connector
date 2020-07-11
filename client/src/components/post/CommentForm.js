import React, { useState } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions';

const CommentForm = props => {
  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    props.addComment(props.postId, { text });
    setText('');
  }

  return (
    <div className="post-form" onSubmit={e => onSubmit(e)}>
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form className="form my-1">
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a comment"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropType.func.isRequired,
  postId: PropType.number.isRequired
}

export default connect(null, { addComment })(CommentForm);