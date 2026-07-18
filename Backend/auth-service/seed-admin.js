require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./src/models/user');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const passwordHash = await bcrypt.hash('Dcfrost.56', 10);
    const existing = await User.findOne({ $or: [{ username: 'admin123' }, { email: 'admin123@gmail.com' }] });
    if (existing) {
      existing.username = 'admin123';
      existing.name = 'Admin User';
      existing.email = 'admin123@gmail.com';
      existing.password = passwordHash;
      existing.college = 'Admin';
      existing.branch = 'Admin';
      existing.year = 1;
      existing.collegeIdImageUrl = 'https://placehold.co/600x400';
      existing.verificationStatus = 'approved';
      existing.role = 'admin';
      await existing.save();
      console.log('Admin account updated successfully');
      process.exit(0);
    }

    await User.create({
      username: 'admin123',
      name: 'Admin User',
      email: 'admin123@gmail.com',
      password: passwordHash,
      college: 'Admin',
      branch: 'Admin',
      year: 1,
      collegeIdImageUrl: 'https://placehold.co/600x400',
      verificationStatus: 'approved',
      role: 'admin',
    });

    console.log('Admin account created successfully');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
