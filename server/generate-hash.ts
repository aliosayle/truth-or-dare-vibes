import * as bcrypt from 'bcrypt';

const plainPassword = 'LanaLebanese123';

async function generateHash() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  console.log('Password:', plainPassword);
  console.log('Generated Hash:', hashedPassword);
}

generateHash(); 