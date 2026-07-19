require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./src/models/user');

const upsertUser = async (userData, password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const existing = await User.findOne({
    $or: [{ username: userData.username }, { email: userData.email }],
  });

  if (existing) {
    Object.assign(existing, userData, { password: passwordHash });
    await existing.save();
    return 'updated';
  }

  await User.create({
    ...userData,
    password: passwordHash,
  });
  return 'created';
};

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminStatus = await upsertUser({
      username: 'admin123',
      name: 'Admin User',
      email: 'admin123@gmail.com',
      college: 'Admin',
      branch: 'Admin',
      year: 1,
      collegeIdImageUrl: 'https://placehold.co/600x400',
      verificationStatus: 'approved',
      role: 'admin',
    }, 'Dcfrost.56');

    console.log(`Admin account ${adminStatus} successfully`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
