const router = require('express').Router();
const db = require('../database');
const path = require('path');

router.get('/papitas', (req, res) => {
  const sql = 'SELECT * FROM dbp_usuarios.tbl_rcredencial';
  db.promise()
    .query(sql)
    .then(([result]) => {
      res.json({ primero: result[0], result });
    });
});

module.exports = router;
