const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   POST api/posts
// @desc    create a post
// @access  private
router.post('/', [auth, [
  check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    await newPost.save();

    res.json(newPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

// @route   GET api/posts
// @desc    get all posts
// @access  private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

// @route   GET api/posts/:post_id
// @desc    get post by id
// @access  private
router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: 'Post not found' });

    res.json(post);
  } catch (error) {
    console.error(error.message);

    // if the passed id is not a valid mongo ObjectId it throws an error of this kind
    if (error.kind === 'ObjectId') return res.status(404).json({ msg: 'Post not found' });

    res.status(500).send('Internal server error');
  }
});

// @route   DELETE api/posts/:post_id
// @desc    delete post
// @access  private
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (post.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized to delete this post' });

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (error) {
    console.error(error.message);

    // if the passed id is not a valid mongo ObjectId it throws an error of this kind
    if (error.kind === 'ObjectId') return res.status(404).json({ msg: 'Post not found' });

    res.status(500).send('Internal server error');
  }
});

// @route   DELETE api/posts/like/:post_id
// @desc    like or unlike a post
// @access  private
router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    const likeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

    if (likeIndex >= 0) {
      post.likes.splice(likeIndex, 1)
    } else {
      post.likes.unshift({ user: req.user.id });
    }

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

// @route   POST api/posts/comment/:post_id
// @desc    comment on a post
// @access  private
router.post('/comment/:post_id', [auth, [
  check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.post_id);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };

    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

// @route   DELETE api/posts/comment/:post_id
// @desc    delete a comment
// @access  private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    const commentIndex = post.comments.map(comment => comment.id.toString()).indexOf(req.params.comment_id)

    if (commentIndex < 0) return res.status(404).json({ msg: 'Comment not found' });

    if (post.comments[commentIndex].user.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized to delete this comment' });

    post.comments.splice(commentIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;