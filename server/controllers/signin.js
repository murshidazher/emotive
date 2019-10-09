const jwt = require('jsonwebtoken');

const handleSignin = (db, bcrypt, req, res) => {

    const { email, password } = req.body;

    console.log('aaaaaassadadsadasd');

    if ( !email || !password ) {
        return Promise.reject('incorrect form submission');
    }

    return db.select('email', 'hash').from('login')
    .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);

            if(isValid) {
                return db.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
            
                    return db('shistory')
                        .where('fid', '=', user[0].id)
                        .then(data => {
                            if (data[0] !== undefined) {
                                return ({
                                    email: user[0].email,
                                    entries: user[0].entries,
                                    id: user[0].id,
                                    name: user[0].name,
                                    joined: user[0].joined,
                                    phone: user[0].phone,
                                    city: user[0].city,
                                    url: data[0].url,
                                    date: data[0].date
                                })
                            }
                            else { 
                                return ({
                                    email: user[0].email,
                                    entries: user[0].entries,
                                    id: user[0].id,
                                    name: user[0].name,
                                    joined: user[0].joined,
                                    phone: user[0].phone,
                                    city: user[0].city,
                                    url: 'https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png',
                                    date: 'MM.DD.YYYY — HH:MM'
                                })
                            }
                        })


                })
                .catch(err => Promise.reject('error logging in'));
            } else {
                Promise.reject('wrong credentials')
            }
        })
        .catch(err => Promise.reject('wrong credentials'))    
}

const getAuthTokenId = () => {
    console.log('auth ok');
}

const signToken = (email) => {
    const jwtPayload = { email };
    return jwt.sign(jwtPayload, 'JWT_SECRET', {expiresIn: '2 days'});
}

const createSessions = (user) => {
    
    // JWT token
    const { id, email } = user;
    const token = signToken(email);
    return { success: true, userId: id, token: token }
}

const handleSigninAuthentication = (db, bcrypt) => (req, res) => {
    const { authorization } = req.headers;

    

    return authorization ?
        getAuthTokenId() :
        handleSignin(db, bcrypt, req, res)
            .then(data => {
                return data.id && data.email ? createSessions(data): Promise.reject(data)
            })
            .then(session => res.json(session))
            .catch(err => {res.status(400).json(err)})
}

module.exports = {
    handleSigninAuthentication
}