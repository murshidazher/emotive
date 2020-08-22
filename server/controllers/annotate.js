const handleResolveAnnotate = (db) => (req, res) => {

}

const handleResponseAnnotate = (db) => (req, res) => {

}

const handleRequestAnnotate = (db) => (req, res) => {

  const { id, cid, url } = req.body;

  let now = new Date();

  now = date.format(now, 'MM.DD.YYYY — HH:mm A', true);

  db('annotate')
      .where({
        id: id,
        client_id: cid,
      })
    .then(data => {
      if (data[0] !== undefined) {

        return res.json({
          client_id: data[0].client_id,
          request: data[0].request,
          created: data[0].created,
        })

      } else {
              // record doesn't exist
              db.transaction(trx => {
                  trx.insert({
                    client_id: cid,
                    request: json,
                    created:now,
                  })
                      .into('annotate')
                      .then(() => {
                          return res.json({
                            client_id: cid,
                            request: json,
                            created:now,
                        });
                      })
                      .then(trx.commit)
                      .catch(trx.rollback)
              })
                  .catch(err => res.status(400).json('unable to process the request'));
          }
      })
      .catch(err => res.status(400).json('unable to process the request'));
}

const handleAnnotatesGet = (db) => (req, res) => {

  const { id, cid } = req.body;

  db('annotate')
    .where({
      client_id: cid,
    })
    .then(data => {
      if (data[0] !== undefined) {

        return res.json({
          client_id: data[0].client_id,
          request: data[0].request,
          created: data[0].created,
        })

      } else
        return res.status(400).json('no annotate requests available');
      })
      .catch(err => res.status(400).json('no annotate requests available'));
}

module.exports = {
  handleRequestAnnotate,
  handleResolveAnnotate,
  handleResponseAnnotate,
  handleAnnotatesGet
}
