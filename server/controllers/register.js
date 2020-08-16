const handleRegister = (db, bcrypt, req, res) => {

  const {
    email,
    name,
    password
  } = req.body;

  if (!email || !password || !name) {
    return Promise.reject('incorrect form submission');
  }


  const hash = bcrypt.hashSync(password);

  return db.transaction(trx => {
      return trx.insert({
          hash: hash,
          email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {

          // select user group
          return trx('user_group')
            .where({
              name: 'Customer',
            }).select('id')
            .then(userGroup => {
              // select user role
              return trx('user_role')
                .where({
                  name: 'Potential Customer',
                }).select('id')
                .then(userRole => {

                  return trx('users')
                    .returning('*')
                    .insert({
                      name: name,
                      email: loginEmail[0],
                      joined: new Date(),
                      phone: '-',
                      city: '-',
                      group_id: userGroup[0].id,
                      user_role_id: userRole[0].id,
                    })
                    .then(user => {
                      return Promise.resolve(user[0]);
                    })
                })
            })


        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => Promise.reject('unable to register'));
}

const signToken = (email, jwt) => {
  const jwtPayload = {
    email
  };
  return jwt.sign(jwtPayload, 'JWT_SECRET', {
    expiresIn: '2 days'
  });
}

const setToken = (token, id, redisClient) => {
  return Promise.resolve(redisClient.set(token, id))
}

const createSessions = (user, redisClient, jwt) => {

  // JWT token
  const {
    id,
    email
  } = user;
  const token = signToken(email, jwt);
  return setToken(token, id, redisClient)
    .then(() => ({
      success: 'true',
      userId: id,
      token: token
    }))
    .catch(console.log)
}

const handleRegisterAuthentication = (db, bcrypt, redisClient, jwt) => (req, res) => {

  return handleRegister(db, bcrypt, req, res)
    .then(data => {
      data.user_role = "Potential Customer";
      data.user_group = "Customer";
      data.permission = "NONE";

      return (data.id && data.email) ? createSessions(data, redisClient, jwt) : Promise.reject(data)
    })
    .then(session => res.status(200).json(session))
    .catch(err => res.status(400).json(err))
}

module.exports = {
  handleRegisterAuthentication
}
