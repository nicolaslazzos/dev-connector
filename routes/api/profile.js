const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    get current user profile
// @access  private
router.get('/me', auth, async (req, res) => {
  try {
    // populate fills the model with the selected fields from the user using the user id
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(404).json({ msg: 'There is no profile for this user' });

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

// @route   POST api/profile
// @desc    create or update user profile
// @access  private
router.post('/', [auth, [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim());

  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // update
      profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });

      return res.json(profile);
    }

    // create
    profile = new Profile(profileFields);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
})

// @route   GET api/profile
// @desc    get all profiles
// @access  public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).send('internal server error');
  }
});

// @route   GET api/profile/user/:user_id
// @desc    get user profile by user id
// @access  public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (error) {
    console.error(error);

    // if the passed id is not a valid mongo ObjectId it throws an error of this kind
    if (error.kind === 'ObjectId') return res.status(404).json({ msg: 'Profile not found' });

    res.status(500).send('internal server error');
  }
});

// @route   DELETE api/profile
// @desc    delete profile, user and posts
// @access  private
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'The user has been deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('internal server error');
  }
});

// @route   PUT api/profile/experience
// @desc    add profile experience
// @access  private
router.put('/experience', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, company, location, from, to, current, description } = req.body;

  const newExp = { title, company, location, from, to, current, description };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience.unshift(newExp);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    delete experience from profile
// @access  private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experience.map(exp => exp.id).indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

// @route   PUT api/profile/education
// @desc    add profile education
// @access  private
router.put('/education', [auth, [
  check('school', 'School is required').not().isEmpty(),
  check('degree', 'Degree is required').not().isEmpty(),
  check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { school, degree, fieldofstudy, from, to, current, description } = req.body;

  const newEdu = { school, degree, fieldofstudy, from, to, current, description };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(newEdu);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

// @route   DELETE api/profile/education/:edu_id
// @desc    delete education from profile
// @access  private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.education.map(edu => edu.id).indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

// @route   GET api/profile/github/:username
// @desc    get user repos from github
// @access  public
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id${config.get('githubClientID')}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) return res.status(404).json({ msg: 'GitHub profile not found' });

      res.json(JSON.parse(body));
    })
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;