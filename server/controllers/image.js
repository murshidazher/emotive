const Clarifai = require('clarifai');
const date = require('date-and-time');

const app = new Clarifai.App({
    apiKey: 'ff32d18b0f054ed5900557af30d1d5e0'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log('rrrrroorooror')
            res.status(400).json('unable to work with API')
        })
}

const handleImage = (db) => (req, res) => {

    const { id, url } = req.body;

    let now = new Date();
    now = date.format(now, 'MM.DD.YYYY — HH:mm A');
        

    db('shistory')
        .where('fid', '=', id)
        .count('fid as CNT')
        .then(count => {
            if (count[0].CNT !== '0') {
                // if record exist
                db.transaction(trx => {
                    trx('shistory')
                        .where('fid', '=', id)
                        .update({
                            fid: id,
                            url: url,
                            date: now
                        })
                        .then(() => {
                            return trx('users')
                                .where('id', '=', id)
                                .increment('entries', 1)
                                .returning('entries')
                                .then(entries => {
                                    res.json({
                                        entries: entries[0],
                                        url: url,
                                        now: now
                                    });
                                })
                        })
                        .then(trx.commit)
                        .catch(trx.rollback)
                })
                    .catch(err => res.status(400).json('unable to register'));


            } else {
                // record doesn't exist
                db.transaction(trx => {
                    trx.insert({
                        fid: id,
                        url: url,
                        date: now
                    })
                        .into('shistory')
                        .then(() => {
                            return trx('users')
                                .where('id', '=', id)
                                .increment('entries', 1)
                                .returning('entries')
                                .then(entries => {
                                    res.json({
                                        entries: entries[0],
                                        url: url,
                                        now: now
                                    });
                                })
                        })
                        .then(trx.commit)
                        .catch(trx.rollback)
                })
                    .catch(err => res.status(400).json('unable to register'));
            }
        })
        .catch(err => res.status(400).json('unable to register'));
    

}

module.exports = {
    handleImage, handleApiCall
}