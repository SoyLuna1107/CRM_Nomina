const router = require('express').Router();
const db = require('../database');

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.post('/registrarUser', (req, res) => {
  console.log(req.body);
  const dataCredencial = {
    CRE_CUSUARIO: req.body.CRE_CUSUARIO || null,
    CRE_CNOMBRE: req.body.CRE_CNOMBRE || null,
    CRE_CNOMBRE2: req.body.CRE_CNOMBRE2 || null,
    CRE_CAPELLIDO: req.body.CRE_CAPELLIDO || null,
    CRE_CAPELLIDO2: req.body.CRE_CAPELLIDO2 || null,
    CRE_CDOCUMENTO: req.body.CRE_CDOCUMENTO || null,
    CRE_CDETALLE_REGISTRO: 'Registrado por el Sistema',
    CRE_CESTADO: 'Activo',
  };
  const sqlSelectPsicologo = 'SELECT * FROM dbp_nomina.TBL_RCREDENCIAL WHERE CRE_CDOCUMENTO = ?';
  db.promise()
    .query(sqlSelectPsicologo, [dataCredencial.CRE_CDOCUMENTO])
    .then(([resultSelectPsicologo]) => {
      if (resultSelectPsicologo.length > 0) {
        res.json({ message: 'Ya existe el Usuario' });
      } else {
        // * Registrar Psicologo
        const sqlInsertCredencial = 'INSERT INTO dbp_nomina.TBL_RCREDENCIAL SET ?';
        db.promise()
          .query(sqlInsertCredencial, [dataCredencial])
          .then(([resultInsertCredencial]) => {
            if (resultInsertCredencial.insertId) {
              const dataRPermiso = {
                FKPER_CUSUARIOS: resultInsertCredencial.insertId,
                PER_CDOCUMENTO: req.body.CRE_CDOCUMENTO || null,
                PER_CNIVEL: req.body.PER_CNIVEL || null, // *
                PER_CCAMPANA: req.body.PER_CCAMPANA || null,
                PER_CDETALLE_REGISTRO: 'Registrado por el Sistema',
                PER_CESTADO: 'Activo',
              };
              const sqlInsertRPermiso = 'INSERT INTO dbp_nomina.TBL_RPERMISO SET ?';
              db.promise()
                .query(sqlInsertRPermiso, [dataRPermiso])
                .then(([resultInsertRPermiso]) => {
                  console.log(`${dataCredencial.CRE_CUSUARIO} - Registrado. - IDCredencial: ${resultInsertCredencial.insertId} - IDRPermiso: ${resultInsertRPermiso.insertId}`);
                  res.json({ message: `${dataCredencial.CRE_CUSUARIO} - Registrado. - IDCredencial: ${resultInsertCredencial.insertId} - IDRPermiso: ${resultInsertRPermiso.insertId}` });
                })
                .catch((err) => console.log('ERROR::', err));
            }
          })
          .catch((err) => console.log('ERROR::', err));
      }
    });
});

module.exports = router;
