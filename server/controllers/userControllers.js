const User = require('../db/models/user-schema');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports.signupUser = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (user) {
    return res.status(403).json({ Message: 'Email already exist' });
  }
  if (body.password != body.confirmPassword) {
    return res.status(403).json({ Message: 'Password doesnt match' });
  }
  const hashedPassword = await bcrypt.hash(body.password, 2);
  body.password = hashedPassword;
  const newUser = await User.create(body);
  res.status(201).json({ Message: 'Thank you for signing up', user: newUser });
};

module.exports.loginUser = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (!user) {
    return res.status(403).json({ message: 'Email or password incorrect' });
  }

  const isMatching = await bcrypt.compare(body.password, user.password);

  if (!isMatching) {
    return res.status(403).json({ message: 'Email or password incorrect' });
  }

  const key = 'dgflghjhdfdjgfllsdj';
  const token = jwt.sign({ id: user._id, firstName: user.firstName }, key, {
    expiresIn: '7d',
  });
  res
    .status(200)
    .json({ message: 'You are logged', token: token, id: user._id });
};

module.exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (e) {
    return res.status(500).json(e);
  }
};

module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ message: 'Email doesnt match' });
  }

  const resetToken = jwt.sign(
    { email: email },
    process.env.FORGOT_PASSWORD_KEY,
    { expiresIn: 30000 }
  );

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'learnmern27389@gmail.com',
      pass: 'djue eviw rusk hcgc',
    },
  });

  let mailOptions = {
    from: 'learnmern27389@gmail.com',
    to: email,
    subject: 'PASSWORD RESET EMAIL',
    text: `Please reset your password using the link http://localhost:${process.env.PORT}/user/reset/${resetToken} `,
  };

  transporter.sendMail(mailOptions, error => {
    if (error) {
      return res.status(404).json({ message: error });
    } else return res.status(200).json({ message: 'Mail send', resetToken });
  });
};

module.exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  try {
    const isValid = jwt.verify(token, process.env.FORGOT_PASSWORD_KEY);
    if (password != confirmPassword) {
      return res.status(403).json({ message: 'Password doesnt match' });
    }
    const email = isValid.email;
    const hashedPassword = await bcrypt.hash(password, 2);
    const user = await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword }
    );
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (e) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
