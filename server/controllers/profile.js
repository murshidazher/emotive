const handleProfileGet = (db) => (req, res) => {
    const { id } = req.params;

    db.select('*').from('users').where({ id })
    .then(user => {

        if(user.length) {
            res.json(user[0]);
        } else {
            res.status(404).json('Not found');
        }
    })
}

const handleProfileUpdate = (db) => (req, res) => { 
    const { id } = req.params;
    const { name, phone, city } = req.body.formInput;

    console.log('reqqq   -> ' + req.body.formInput);
    console.log("\"" + name + "\"" + phone + "\"" + city + "\"");

    const obj = {}



    if (name !== undefined && name !== null && name !== '') obj.name = name;
    if (phone !== undefined && phone !== null && phone !== '') obj.phone = phone;
    if (city !== undefined && city !== null && city !== '') obj.city = city;

    
    if (city !== undefined && city !== null && city !== '')
        console.log('hehhehhehhee   inside city  ' + city)

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