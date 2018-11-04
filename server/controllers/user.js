import pool from './../db/pool';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || password.length < 6)
    return res.status(400).json({ message: 'email and password is required to login' });
  const GET_USER_QUERY = `select * from user where email = ?`;
  try {
    const userArr = await pool.query(GET_USER_QUERY, [email]);
    if (userArr && Array.isArray(userArr) && userArr.length === 1 && userArr[0]) {
      const user = userArr[0];
      const { passwordHash, firstName, lastName, email, aboutMe } = user;
      if(bcrypt.compareSync(password,passwordHash) === true)
      return res.status(200).json({ authorized: true, firstName, lastName, email, aboutMe });
      else return res.status(200).json({ authorized: false })
    }
    else throw new Error("unauthorized user");
  }
  catch (error) {
    res.status(403).json({ authorized: false, message: error.message });
  }
}
const signup = async (req, res) => {
  const { firstName, lastName = '', email, password, aboutMe = '' } = req.body;
  if (!firstName || !email || !password || password.length < 6)
    return res.status(400).json({ message: 'first name, email and password(minimum 6 character) is required to create user' });
  const GET_USER_QUERY = `select count(*) as count from user where email= ?`;
  const INSERT_USER_QUERY = `insert into user(firstName,lastName,email,passwordHash, aboutMe) values (?,?,?,?,?)`
  try {
    const userCount = await pool.query(GET_USER_QUERY, [email]);
    if (userCount && Array.isArray(userCount) && userCount.length === 1 && userCount[0].count !== 0)
      return res.status(403).json({ message: 'user with mentioned email already exist' });
    const passwordHash = bcrypt.hashSync(password, salt);
    const result = await pool.query(INSERT_USER_QUERY, [firstName, lastName, email, passwordHash, aboutMe]);
    res.status(200).json({ success: true, message: "user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error', errorMsg: error.message });
  }
}

module.exports = {
  login,
  signup
}