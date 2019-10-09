const handleProfileGet = (db) => (req, res) => {
    const { id } = req.params;

    db.select('*').from('users').where({ id })
    .then(user => {

        if (user.length) {
        
            db('shistory')
                .where('fid', '=', user[0].id)
                .then(data => {
                    if (data[0] !== undefined) {
                        res.json({
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
                    
                        res.json({
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
        } else {
            res.status(404).json('Not found');
        }
    })
}

const handleProfileUpdate = (db) => (req, res) => { 
    const { id } = req.params;
    const { name, phone, city } = req.body.formInput;


    const obj = {}


    if (name !== undefined && name !== null && name !== '') obj.name = name;
    if (phone !== undefined && phone !== null && phone !== '') obj.phone = phone;
    if (city !== undefined && city !== null && city !== '') obj.city = city;


    db('users')
        .where({ id })
        .update({
            ...obj
        })
        .then( resp => {
            if (resp) {
                res.status(200).json('success')
            } else {
                res.status(400).json('Unable to update');
            }
        })
    .catch(err => res.status(400).json('Erro update'))

}

module.exports = {
    handleProfileGet,
    handleProfileUpdate
}