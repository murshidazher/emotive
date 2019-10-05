const handleSignin = (db, bcrypt) => (req, res) => {

    const { email, password } = req.body;

    if ( !email || !password ) {
        return res.status(400).json('incorrect form submission');
    }

    db.select('email', 'hash').from('login')
    .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);

            if(isValid) {
                return db.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
            
                    db('shistory')
                        .where('fid', '=', user[0].id)
                        .then(data => {
                            if (data[0] !== undefined) {
                                res.status(200).json({
                                    email: user[0].email,
                                    entries: user[0].entries,
                                    id: user[0].id,
                                    name: user[0].name,
                                    url: data[0].url,
                                    date: data[0].date
                                })
                            }
                            else { 
                                res.status(200).json({
                                    email: user[0].email,
                                    entries: user[0].entries,
                                    id: user[0].id,
                                    name: user[0].name,
                                    url: 'https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png',
                                    date: 'MM.DD.YYYY — HH:MM'
                                })
                            }
                        })


                })
                .catch(err => res.status(400).json('error logging in'));
            } else {
                res.status(400).json('wrong credentials')
            }

            
        })
        .catch(err => res.status(400).json('wrong credentials'))    
}

module.exports = {
    handleSignin
}