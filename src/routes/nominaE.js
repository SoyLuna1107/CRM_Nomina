const router = require('express').Router();
const db = require('../database');
const path = require('path');
const ExcelJS = require('exceljs');
const Moment = require('moment');
const Class2 = require('../Class2');
const { DeCrypt } = require('../public/js/Class2');
const { query } = require('../database');

router.get('/viewCrearGerente', async (req, res) => {
  const sqlCamp = `SELECT EST_CDETALLE, EST_CDETALLE1 FROM TBL_RESTANDAR WHERE EST_CCONSULTA = 'cmbCampaña' AND EST_CDETALLE != '' AND EST_CDETALLE1 != ''`;
  let [rowsCamp] = await db.promise().query(sqlCamp);
  res.render('nomina/crearGerente', { title: 'Crear Gerente', rowsCamp });
});

// router.post('/crearGerente', (req, res) => {
//   console.log(req.body);
//   const dataCredencial = {
//     CRE_CUSUARIO: req.body.CRE_CUSUARIO || `${req.body.CRE_CNOMBRE}.${req.body.CRE_CAPELLIDO}`,
//     CRE_CNOMBRE: req.body.CRE_CNOMBRE || null,
//     CRE_CNOMBRE2: req.body.CRE_CNOMBRE2 || null,
//     CRE_CAPELLIDO: req.body.CRE_CAPELLIDO || null,
//     CRE_CAPELLIDO2: req.body.CRE_CAPELLIDO2 || null,
//     CRE_CDOCUMENTO: req.body.CRE_CDOCUMENTO || null,
//     CRE_CDETALLE_REGISTRO: 'Registrado por el Sistema',
//     CRE_CESTADO: 'Activo',
//   };
//   // * Registrar Psicologo
//   const sqlInsertCredencial = 'INSERT INTO dbp_nomina.TBL_RCREDENCIAL SET ?';
//   db.promise()
//     .query(sqlInsertCredencial, [dataCredencial])
//     .then(([resultInsertCredencial]) => {
//       if (resultInsertCredencial.insertId) {
//         const dataRPermiso = {
//           FKPER_CUSUARIOS: resultInsertCredencial.insertId,
//           PER_CDOCUMENTO: req.body.CRE_CDOCUMENTO || null,
//           PER_CNIVEL: 'GERENTE', // *
//           PER_CCAMPANA: req.body.PER_CCAMPANA || null,
//           PER_CDETALLE_REGISTRO: 'Registrado por el Sistema',
//           PER_CESTADO: 'Activo',
//         };
//         const sqlInsertRPermiso = 'INSERT INTO dbp_nomina.TBL_RPERMISO SET ?';
//         db.promise()
//           .query(sqlInsertRPermiso, [dataRPermiso])
//           .then(([resultInsertRPermiso]) => {
//             console.log(`${dataCredencial.CRE_CUSUARIO} - Registrado. - IDCredencial: ${resultInsertCredencial.insertId} - IDRPermiso: ${resultInsertRPermiso.insertId}`);
//             req.flash('messageSuccess', `Registrado Exitosamente`);
//             res.redirect('/nomina/viewCrearGerente');
//           })
//           .catch((err) => console.log('ERROR::', err));
//       }
//     })
//     .catch((err) => console.log('ERROR::', err));
// });

router.post('/crearGerente', async(req, res) =>{
  let errorMessage = 0;

  const dataCredencial = {
    FKPER_CUSUARIOS: req.body.CRE_CUSUARIO || null,
    PER_CDOCUMENTO: req.body.CRE_CDOCUMENTO || null,
    PER_CNIVEL: 'GERENTE',
    PER_CNOMBRE: `${req.body.CRE_CNOMBRE} ${req.body.CRE_CNOMBRE2} ${req.body.CRE_CAPELLIDO} ${req.body.CRE_CAPELLIDO2}`,
    PER_CDETALLE_REGISTRO: 'Registrado por el Sistema',
    PER_CESTADO: 'Activo',
  };
  // const sqlSearch = "SELECT * FROM TBL_RPERMISO WHERE PER_CDOCUMENTO = ?";

  //  db.promise()

  //   .query(sqlSearch,[dataCredencial.PER_CDOCUMENTO])
  //   .then(([resultSearch]) => {
      
      
  //     if(resultSearch.length>0){
  //       errorMessage = 1;
  //       req.flash('messageError', `El Gerente ya existe`);
  //     } else{
  //       console.log('aún no existe');
  //     }
      
      
  //     // resultSearch.forEach(element => {
  //     //   // console.log('CC',element.PER_CDOCUMENTO);
  //     // });
  //   })
   
    
    // .catch((err) => console.log("ERROR::", err));
    // req.flash('messageError', `El Gerente ya existe`)
    // req.flash('messageSuccess', `Registrado Exitosamente`);
    // console.log(errorMessage);
   
    // if(errorMessage>0){
    //   req.flash('messageSuccess', `Registrado Exitosamente`);
      // req.flash('messageError', 'El gerente ya existe');
    // }
    

  
  
  const sqlInsertCredencial = 'INSERT INTO dbp_nomina.TBL_RPERMISO SET ?';
  await db.promise()

    .query(sqlInsertCredencial, [dataCredencial])
    .then(([result]) => {
      req.flash('messageSuccess', `Registrado Exitosamente`);
      res.redirect('/nomina/viewCrearGerente');
    })
    .catch((err) => console.log("ERROR::", err));

});
 
// * Ruta para buscar un usuario por cedula en TBL_RCREDENCIAL
router.post('/gerenteCC', async (req, res) => {
  const { CRE_CDOCUMENTO } = req.body;
  const sqlSelect = 'SELECT * FROM TBL_RPERMISO WHERE PER_CDOCUMENTO = ?';
  let [rows] = await db.promise().query(sqlSelect, [CRE_CDOCUMENTO]);
  res.json(rows);
});

router.get('/listGerentes', async (req, res) => {
  //const sql = `SELECT * FROM TBL_RCREDENCIAL INNER JOIN TBL_RPERMISO ON TBL_RCREDENCIAL.PKCRE_NCODIGO = TBL_RPERMISO.FKPER_CUSUARIOS WHERE PER_CNIVEL = 'GERENTE'`;
  const sql = `SELECT * FROM TBL_RPERMISO WHERE PER_CNIVEL = 'GERENTE'`;
  let [rowsGerentes] = await db.promise().query(sql);
  res.render('nomina/listGerentes', { title: 'Lista de Gerentes', rowsGerentes });
});

// * Vista para actualizar gerente
router.get('/viewActualizarGerente/:id', async (req, res) => {
  const { id } = req.params;
  const sqlSelect = 'SELECT * FROM TBL_RCREDENCIAL WHERE PKCRE_NCODIGO = ?';
  let [rows] = await db.promise().query(sqlSelect, [id]);
  const sqlCamp = `SELECT EST_CDETALLE, EST_CDETALLE1 FROM TBL_RESTANDAR WHERE EST_CCONSULTA = 'cmbCampaña' AND EST_CDETALLE != '' AND EST_CDETALLE1 != ''`;
  let [rowsCamp] = await db.promise().query(sqlCamp);
  res.render('nomina/actualizarGerente', { title: 'Actualizar Gerente', dataGerente: rows[0], rowsCamp });
});

router.post('/getAll', async (req, res) => {
  const { idGerente } = req.body;
  const sql = `SELECT * FROM TBL_RCREDENCIAL INNER JOIN TBL_RPERMISO ON TBL_RCREDENCIAL.PKCRE_NCODIGO = TBL_RPERMISO.FKPER_CUSUARIOS WHERE PKCRE_NCODIGO = ?`;
  let [rows] = await db.promise().query(sql, [idGerente]);
  res.json({ dataUser: rows[0] });
});

// * Ruta para actualizar gerente - UPDATE
router.post('/actualizarGerente/:id', async (req, res) => {
  const { id } = req.params;
  const dataCredencial = [req.body.CRE_CUSUARIO || `${req.body.CRE_CNOMBRE}.${req.body.CRE_CAPELLIDO}`, req.body.CRE_CNOMBRE || null, req.body.CRE_CNOMBRE2 || null, req.body.CRE_CAPELLIDO || null, req.body.CRE_CAPELLIDO2 || null, req.body.CRE_CDOCUMENTO || null, id];
  const sqlUpdateCre = `UPDATE dbp_nomina.TBL_RCREDENCIAL SET CRE_CUSUARIO = ?, CRE_CNOMBRE = ?, CRE_CNOMBRE2 = ?, CRE_CAPELLIDO = ?, CRE_CAPELLIDO2 = ?, CRE_CDOCUMENTO = ? WHERE PKCRE_NCODIGO = ?`;
  let [resultCre] = await db.promise().query(sqlUpdateCre, dataCredencial);
  const dataRPermiso = [req.body.PER_CDOCUMENTO, req.body.PER_CCAMPANA, id];
  const sqlUpdateRPer = `UPDATE dbp_nomina.TBL_RPERMISO SET PER_CDOCUMENTO = ?, PER_CCAMPANA = ? WHERE FKPER_CUSUARIOS = ?`;
  let [resultRPer] = await db.promise().query(sqlUpdateRPer, dataRPermiso);
  req.flash('messageSuccess', `Actualizado Exitosamente`);
  res.redirect('/nomina/listGerentes')
});

module.exports = router;
