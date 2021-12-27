const router = require("express").Router();
const db = require("../database");
const path = require("path");
const ExcelJS = require("exceljs");
const Moment = require("moment");
const Class2 = require("../Class2");
const { DeCrypt } = require("../public/js/Class2");
const { query } = require("../database");

router.get("/cargarExcel", (req, res) => {
  let array = ["asd", "asdasd", "asd", "qqqq"];
  res.render("nomina/cargarExcel", { title: "Cargar Excel", dataNomina: array });
});

router.post("/enviarExcel", (req, res) => {
  try {
    console.log(req.user);
    let excel = req.files.excel,
      nombreArchivo = `x${req.user.Usuario}x${excel.name}`,
      rutaArchivo = path.resolve(`./src/public/doc/excel/${nombreArchivo}`);
    // * Guardar Excel
    excel.mv(rutaArchivo, (err) => {
      if (err) {
        return res.status(500).send({ message: err });
      } else {
        // * Leer Excel
        const workbook = new ExcelJS.Workbook();
        workbook.xlsx
          .readFile(rutaArchivo)
          .then(() => {
            let hojas = workbook.worksheets.map((sheet) => sheet.name);

            let selectedHoja1 = workbook.getWorksheet("Head count"),
              rowsExcel = selectedHoja1.actualRowCount,
              columnsExcel = selectedHoja1.actualColumnCount;

            // * Iterar Filas del Excel para guardar cada campo en el objeto y guardar en DB
            for (let i = 2; i <= rowsExcel; i++) {
              // * si encuentra un campo vacío en la columna de cedula no lo inserta
              if (selectedHoja1.getRow(i).getCell(7).toString() === "") continue;
              // * Data donde se almacena info de Excel para insertar en DB
              const data = {
                CON_CDETALLE: "",
                CON_CDETALLE1: "",
                CON_CDETALLE2: "",
                CON_CDETALLE3: "",
                CON_CDETALLE4: "",
                CON_CDETALLE5: "",
                CON_CDETALLE6: "",
                CON_CDETALLE7: "",
                CON_CDETALLE8: "",
                CON_CDETALLE9: "",
                CON_CDETALLE10: "",
                CON_CDETALLE11: "",
                CON_CDETALLE12: "",
                CON_CDETALLE13: "",
                CON_CDETALLE14: "",
                CON_CDETALLE15: "",
                CON_CDETALLE16: "",
                CON_CDETALLE17: "",
                CON_CDETALLE18: "",
                CON_CDETALLE19: "",
                CON_CDETALLE20: "",
                CON_CDETALLE21: "",
                CON_CDETALLE22: "",
                CON_CDETALLE23: "",
                CON_CDETALLE24: "",
                CON_CDETALLE25: "",
                CON_CDETALLE26: "",
                CON_CDETALLE27: "",
                CON_CDETALLE28: "",
                CON_CDETALLE29: "",
                CON_CDETALLE30: "",
                CON_CDETALLE31: "",
                CON_CDETALLE32: "",
                CON_CDETALLE33: "",
                CON_CDETALLE34: "",
                CON_CDETALLE35: "",
                CON_CDETALLE36: "",
                CON_CDETALLE37: "",
                CON_CDETALLE38: "",
                CON_CDETALLE39: "",
                CON_CDETALLE40: "",
                CON_CDETALLE41: "",
                CON_CDETALLE42: "",
                CON_CDETALLE43: "",
                CON_CDETALLE44: "",
                CON_CDETALLE45: "",
                CON_CDETALLE46: "",
                CON_CDETALLE47: "",
                CON_CDETALLE48: "",
                CON_CDETALLE49: "",
                CON_CDETALLE50: "",
                CON_CDETALLE51: "",
                CON_CDETALLE52: "",
                CON_CDETALLE53: "",
                CON_CDETALLE54: "",
                CON_CDETALLE55: "",
                CON_CDETALLE56: "",
                CON_CDETALLE57: "",
                CON_CDETALLE58: "",
                CON_CDETALLE59: "",
                CON_CDETALLE60: "",
                CON_CDETALLE_REGISTRO: "Registro Por Cargue",
                CON_CESTADO: "Activo",
              };
              let claves = Object.keys(data);
              // * Tomar cada campo de la fila y guardar en {data}
              for (let j = 1; j <= columnsExcel; j++) {
                data[claves[j - 1]] = selectedHoja1.getRow(i).getCell(j).toString();
              }
              const dataCampañas = {
                CON_CDETALLE2: "",
              };
              let clavesCampañas = Object.keys(data);
              for (let j = 1; j <= columnsExcel; j++) {
                dataCampañas[clavesCampañas[j - 1]] = selectedHoja1.getRow(i).getCell(2).toString();
              }
              console.log(dataCampañas);
              //se dejan vacias las columnas que son calulos
              data["CON_CDETALLE24"] = null;
              data["CON_CDETALLE25"] = null;
              data["CON_CDETALLE36"] = null;
              //Fecha de ingreso
              if (data["CON_CDETALLE23"] && data["CON_CDETALLE23"].length > 10) {
                let dateTIP_CDETALLE23 = new Date(data["CON_CDETALLE23"]);
                data["CON_CDETALLE23"] = dateTIP_CDETALLE23.toJSON().substr(0, 10).split("-").reverse().join("/");
              }
              //Fecha de retiro
              if (data["CON_CDETALLE31"] && data["CON_CDETALLE31"].length > 10) {
                let dataCON_CDETALLE31 = new Date(data["CON_CDETALLE31"]);
                data["CON_CDETALLE31"] = dataCON_CDETALLE31.toJSON().substr(0, 10).split("-").reverse().join("/");
              }
              //Fecha de nacimiento
              if (data["CON_CDETALLE16"] && data["CON_CDETALLE16"].length > 10) {
                let dataCON_CDETALLE16 = new Date(data["CON_CDETALLE16"]);
                data["CON_CDETALLE16"] = dataCON_CDETALLE16.toJSON().substr(0, 10).split("-").reverse().join("/");
              }

              //Obtener estado segun l fecha de ingreso y la fecha actual
              let fecha = new Date();
              let mes = fecha.getMonth() + 1; //obteniendo mes
              let dia = fecha.getDate(); //obteniendo dia
              let ano = fecha.getFullYear();
              let fechaActual = new Date(ano + "-" + mes + "-" + dia);
              let estadoUsarioLista;
              let fechaRetiro = new Date(data["CON_CDETALLE31"].split("/").reverse().join("-"));
              fechaRetiro < fechaActual ? (estadoUsarioLista = "Retiro") : (estadoUsarioLista = "Activo");

              data["CON_CESTADO"] = estadoUsarioLista;

              // * Insertar en DB
              const sqlInsert = "INSERT INTO dbp_nomina.TBL_RCONTENIDO SET ?";
              db.promise()

                .query(sqlInsert, [data])
                .then(([result]) => {
                  // console.log(result);
                })
                .catch((err) => console.log("ERROR::", err));
            }
            // * Redirigir si fue exitoso (⌐■_■)
            req.flash("messageSuccess", `Registrados con exito`);
            res.redirect("/nomina/cargarExcel");
          })
          .catch((err) => console.log(err));
      }
    });
  } catch (error) {
    console.log("--- ERROR En Carque Masivo --- \n", error);
  }
});

router.get("/crearUsuario", (req, res) => {
  const sqlCampañas = "SELECT EST_CDETALLE1 FROM dbp_nomina.TBL_RESTANDAR WHERE EST_CCONSULTA='cmbCampaña' ORDER BY EST_CDETALLE1 asc";
  db.promise()

    .query(sqlCampañas)
    .then(([result]) => {
      const sqlCargos = "SELECT EST_CDETALLE FROM dbp_nomina.TBL_RESTANDAR WHERE EST_CCONSULTA='cmbCargo' ORDER BY EST_CDETALLE asc";
      db.promise()

        .query(sqlCargos)
        .then(([resultCargos]) => {
          const sqlJefeInm = "SELECT CON_CDETALLE12 FROM dbp_nomina.TBL_RCONTENIDO WHERE CON_CDETALLE12 IS NOT NULL AND CON_CDETALLE12 !='-' AND CON_CDETALLE12 !='' GROUP BY CON_CDETALLE12 ORDER BY CON_CDETALLE12 asc";
          db.promise()

            .query(sqlJefeInm)
            .then(([resultJefeInm]) => {
              console.log("resultJefeInmediato", resultJefeInm);
              // res.json({ result });

              res.render("nomina/crearUsuario", { title: "Añadir Usuario", dataCampanas: result, dataCargos: resultCargos, dataJefeInm: resultJefeInm });
            })
            .catch((err) => console.log("ERROR::", err));
        })
        .catch((err) => console.log("ERROR::", err));
    })
    .catch((err) => console.log("ERROR::", err));
});

router.post("/crearUsuario", (req, res) => {
  let currentDate = new Date(Date.now());
  currentDate.toJSON().substr(0, 10).split("-").reverse().join("/");
  const {
    modalidad,
    campaña,
    cargo,
    loguin_id,
    cedula_crear_us,
    full_name,
    jefe_inm,
    tel_fijo,
    tel_celular,
    fecha_nacimiento,
    sexo,
    direccion,
    Grupo_sanguineo,
    eps,
    estado_civil,
    numero_hijos,
    estudios,
    usuario_rr,
    usuario_Ac,
    correo,
    fecha_retiro,
    estado,
    detalle,
    internet_hogar,
    megas_internet_hogar,
    localidad,
    barrio,
    usuario_red,
    vacunado,
    vacuna_aplicada,
    vac_primer_dosis,
    vac_segunda_dosis,
    vac_tercer_dosis,
  } = req.body;
  const newUsuario = {
    CON_CDETALLE: modalidad,
    CON_CDETALLE1: "",
    CON_CDETALLE2: campaña,
    CON_CDETALLE3: "",
    CON_CDETALLE4: cargo,
    CON_CDETALLE5: loguin_id,
    CON_CDETALLE6: cedula_crear_us,
    CON_CDETALLE7: "",
    CON_CDETALLE8: "",
    CON_CDETALLE9: "",
    CON_CDETALLE10: full_name,
    CON_CDETALLE11: "",
    CON_CDETALLE12: jefe_inm,
    CON_CDETALLE13: "",
    CON_CDETALLE14: tel_fijo,
    CON_CDETALLE15: tel_celular,
    CON_CDETALLE16: fecha_nacimiento,
    CON_CDETALLE17: sexo,
    CON_CDETALLE18: direccion,
    CON_CDETALLE19: Grupo_sanguineo,
    CON_CDETALLE20: eps,
    CON_CDETALLE21: estado_civil,
    CON_CDETALLE22: numero_hijos,
    CON_CDETALLE23: currentDate,
    CON_CDETALLE24: "",
    CON_CDETALLE25: "",
    CON_CDETALLE26: estudios,
    CON_CDETALLE27: usuario_rr,
    CON_CDETALLE28: usuario_Ac,
    CON_CDETALLE29: correo,
    CON_CDETALLE30: "",
    CON_CDETALLE31: fecha_retiro,
    CON_CDETALLE32: "",
    CON_CDETALLE33: "",
    CON_CDETALLE34: estado,
    CON_CDETALLE35: detalle,
    CON_CDETALLE36: "",
    CON_CDETALLE37: internet_hogar,
    CON_CDETALLE38: megas_internet_hogar,
    CON_CDETALLE39: localidad,
    CON_CDETALLE40: barrio,
    CON_CDETALLE41: "",
    CON_CDETALLE42: "",
    CON_CDETALLE43: "",
    CON_CDETALLE44: usuario_red,
    CON_CDETALLE45: vacunado,
    CON_CDETALLE46: vacuna_aplicada,
    CON_CDETALLE47: vac_primer_dosis,
    CON_CDETALLE48: vac_segunda_dosis,
    CON_CDETALLE49: vac_tercer_dosis,
    CON_CDETALLE50: "",
    CON_CDETALLE51: "",
    CON_CDETALLE52: "",
    CON_CDETALLE53: "",
    CON_CDETALLE54: "",
    CON_CDETALLE55: "",
    CON_CDETALLE56: "",
    CON_CDETALLE57: "",
    CON_CDETALLE58: "",
    CON_CDETALLE59: "",
    CON_CDETALLE60: "",
    CON_CDETALLE_REGISTRO: "Registro por formulario",
    CON_CESTADO: "Activo",
  };

  const sqlNewUsuario = "INSERT INTO dbp_nomina.TBL_RCONTENIDO SET ?";
  db.promise()

    .query(sqlNewUsuario, [newUsuario])
    .then(([result]) => {
      // console.log(result);
    })
    .catch((err) => console.log("ERROR::", err));

  res.send("recibido");
});

router.get("/listaUsuarios", (req, res) => {
  const sqlUsuarios = "SELECT * FROM dbp_nomina.TBL_RCONTENIDO";
  db.promise()

    .query(sqlUsuarios)
    .then(([result]) => {
      for (let i = 0; i < result.length; i++) {
        result[i].EnCrypt = Class2.EnCrypt(`${result[i].PKCON_NCODIGO}`);
      }
      res.render("nomina/listaUsuarios", { title: "Lista Usuario", usuarios: result });
    })
    .catch((err) => console.log("ERROR::", err));
});

router.get("/actualizarUsuario/:id", (req, res) => {
  let id = DeCrypt(req.params.id);
  const sqlUsuarios = "SELECT * FROM dbp_nomina.TBL_RCONTENIDO WHERE PKCON_NCODIGO=?";
  db.promise()
    .query(sqlUsuarios, [id])
    .then(([result]) => {
      //consutar campañas
      const sqlCampañas = "SELECT EST_CDETALLE1 FROM dbp_nomina.TBL_RESTANDAR WHERE EST_CCONSULTA='cmbCampaña' ORDER BY EST_CDETALLE1 asc";
      db.promise()
        .query(sqlCampañas)
        .then(([resultAll]) => {
          //consultar jefes de inmediatos
          const sqlJefesInm = "SELECT CON_CDETALLE12 FROM dbp_nomina.TBL_RCONTENIDO GROUP BY CON_CDETALLE12";
          db.promise()
            .query(sqlJefesInm)
            .then(([resultJefesInm, resultJefesOpe]) => {
              const sqlJefesOpe = "SELECT CON_CDETALLE13 FROM dbp_nomina.TBL_RCONTENIDO GROUP BY CON_CDETALLE13";
              // const sqlJefesOpe = "SELECT * FROM dbp_nomina.TBL_RCONTENIDO ";
              db.promise()

                .query(sqlJefesOpe)
                .then(([resultJefesOpe]) => {
                  //fecha ingreso
                  if (result[0]["CON_CDETALLE23"] && result[0]["CON_CDETALLE23"].length > 10) {
                    let dateCON_CDETALLE23 = new Date(result[0]["CON_CDETALLE23"]);
                    result[0]["CON_CDETALLE23"] = dateCON_CDETALLE23.toJSON().substr(0, 10).split("-").reverse().join("/");
                  }
                  let fechaIngreso = result[0]["CON_CDETALLE23"].split("/").reverse().join("-");
                  let fechaRetiro = result[0]["CON_CDETALLE31"].split("/").reverse().join("-");
                  let fechaNacimiento = result[0]["CON_CDETALLE16"].split("/").reverse().join("-");

                  //Calcular antiguedad en dias

                  let fecha = new Date();
                  let mes = fecha.getMonth() + 1; //obteniendo mes
                  let dia = fecha.getDate(); //obteniendo dia
                  let ano = fecha.getFullYear();
                  let fechaActual = ano + "-" + mes + "-" + dia;
                  let fechaInicio = new Date(fechaIngreso).getTime();
                  let fechaFin = new Date(fechaActual).getTime();
                  let diff = fechaFin - fechaInicio;
                  let antiguedadDias = parseInt(diff / (1000 * 60 * 60 * 24));

                  //Tipo de antiguedad
                  let mesAntiguedad = parseInt(antiguedadDias / 30);
                  let mesAntiguedadAnterior = mesAntiguedad - 1;
                  let tipoAntiguedad;
                  mesAntiguedad == 0 || mesAntiguedad == 1 ? (tipoAntiguedad = "Entre 0 y 1 mes") : (tipoAntiguedad = "Entre" + " " + mesAntiguedadAnterior + " " + "y" + " " + mesAntiguedad + " " + "meses");

                  console.log(tipoAntiguedad);
                  res.render("nomina/actualizarUsuario", { title: "Editar Usuario", idEncrypt: req.params.id, usuario: result[0], usuarioAll: resultAll, jefesInm: resultJefesInm, jefesOpe: resultJefesOpe, fechaIngreso, fechaRetiro, fechaNacimiento, antiguedadDias, tipoAntiguedad });
                })
                .catch((err) => console.log("ERROR::", err));
            })
            .catch((err) => console.log("ERROR::", err));
        })
        .catch((err) => console.log("ERROR::", err));
    })
    .catch((err) => console.log("ERROR::", err));
});

router.post("/actualizarUsuario/:id", (req, res) => {
  let id = DeCrypt(req.params.id);
  let currentDate = new Date(Date.now());
  currentDate.toJSON().substr(0, 10).split("-").reverse().join("/");
  // console.log("ID", id);
  const {
    modalidad,
    campaña,
    cargo,
    loguin_id,
    cedula_crear_us,
    full_name,
    jefe_inm,
    tel_fijo,
    tel_celular,
    fecha_nacimiento,
    sexo,
    direccion,
    Grupo_sanguineo,
    eps,
    estado_civil,
    numero_hijos,
    fecha_ingreso,
    estudios,
    usuario_rr,
    usuario_Ac,
    correo,
    estadoUsuario,
    fecha_retiro,
    estado,
    detalle,
    internet_hogar,
    megas_internet_hogar,
    localidad,
    barrio,
    usuario_red,
    vacunado,
    vacuna_aplicada,
    vac_primer_dosis,
    vac_segunda_dosis,
    vac_tercer_dosis,
  } = req.body;
  // console.log(req.body);
  const updateUsuario = {
    CON_CDETALLE: modalidad,
    CON_CDETALLE1: "",
    CON_CDETALLE2: campaña,
    CON_CDETALLE3: "",
    CON_CDETALLE4: cargo,
    CON_CDETALLE5: loguin_id,
    CON_CDETALLE6: cedula_crear_us,
    CON_CDETALLE7: "",
    CON_CDETALLE8: "",
    CON_CDETALLE9: "",
    CON_CDETALLE10: full_name,
    CON_CDETALLE11: "",
    CON_CDETALLE12: jefe_inm,
    CON_CDETALLE13: "",
    CON_CDETALLE14: tel_fijo,
    CON_CDETALLE15: tel_celular,
    CON_CDETALLE16: fecha_nacimiento,
    CON_CDETALLE17: sexo,
    CON_CDETALLE18: direccion,
    CON_CDETALLE19: Grupo_sanguineo,
    CON_CDETALLE20: eps,
    CON_CDETALLE21: estado_civil,
    CON_CDETALLE22: numero_hijos,
    CON_CDETALLE23: fecha_ingreso,
    CON_CDETALLE24: "",
    CON_CDETALLE25: "",
    CON_CDETALLE26: estudios,
    CON_CDETALLE27: usuario_rr,
    CON_CDETALLE28: usuario_Ac,
    CON_CDETALLE29: correo,
    CON_CDETALLE30: "",
    CON_CDETALLE31: fecha_retiro,
    CON_CDETALLE32: "",
    CON_CDETALLE33: "",
    CON_CDETALLE34: estado,
    CON_CDETALLE35: detalle,
    CON_CDETALLE36: "",
    CON_CDETALLE37: internet_hogar,
    CON_CDETALLE38: megas_internet_hogar,
    CON_CDETALLE39: localidad,
    CON_CDETALLE40: barrio,
    CON_CDETALLE41: "",
    CON_CDETALLE42: "",
    CON_CDETALLE43: "",
    CON_CDETALLE44: usuario_red,
    CON_CDETALLE45: vacunado,
    CON_CDETALLE46: vacuna_aplicada,
    CON_CDETALLE47: vac_primer_dosis,
    CON_CDETALLE48: vac_segunda_dosis,
    CON_CDETALLE49: vac_tercer_dosis,
    CON_CDETALLE50: "",
    CON_CDETALLE51: "",
    CON_CDETALLE52: "",
    CON_CDETALLE53: "",
    CON_CDETALLE54: "",
    CON_CDETALLE55: "",
    CON_CDETALLE56: "",
    CON_CDETALLE57: "",
    CON_CDETALLE58: "",
    CON_CDETALLE59: "",
    CON_CDETALLE60: "",
    CON_CDETALLE_REGISTRO: "Actualizado",
    CON_CESTADO: "Activo",
  };
  //Obtener estado segun la fecha de ingreso y la fecha actual
  let fechaRetiro = new Date(updateUsuario["CON_CDETALLE31"].split("/").reverse().join("-"));
  fechaRetiro < currentDate ? (updateUsuario["CON_CESTADO"] = "Retiro") : (updateUsuario["CON_CESTADO"] = "Activo");

  //separar camapañas para que sean insertadas
  let campañastrasnver = updateUsuario["CON_CDETALLE2"];
  campañastrasnver = campañastrasnver.join(",");
  updateUsuario["CON_CDETALLE2"] = campañastrasnver;
  // console.log('CAMPAÑAS',updateUsuario["CON_CDETALLE2"])
  // console.log('CAMPAÑAS',campañastrasnver);

  const sqlUpdateUsuario = "UPDATE dbp_nomina.TBL_RCONTENIDO SET ? WHERE PKCON_NCODIGO = ?";
  db.promise()

    .query(sqlUpdateUsuario, [updateUsuario, id])
    .then(([result]) => {
      req.flash("messageSuccess", `Usuario Actualizado`);
      res.redirect("/nomina/listaUsuarios");
    })
    .catch((err) => console.log("ERROR::", err));
});

router.post("/getUsuarioID", (req, res) => {
  const sqlUsuarios = "SELECT * FROM dbp_nomina.TBL_RCONTENIDO WHERE PKCON_NCODIGO=?";
  let id = req.body.id;
  db.promise()

    .query(sqlUsuarios, [id])
    .then(([result]) => {
      res.json(result[0]);
    })
    .catch((err) => console.log("ERROR::", err));
});

//-------------CAMPAÑAS----------------------
router.get("/crearCampania", (req, res) => {
  const sqlCampañas = "SELECT EST_CDETALLE1 FROM dbp_nomina.TBL_RESTANDAR WHERE EST_CCONSULTA='cmbCampaña' ORDER BY EST_CDETALLE1 asc";
  db.promise()

    .query(sqlCampañas)
    .then(([result]) => {
      //console.log(result);
      res.render("nomina/crearCampania", {title: "Crear Campaña"})
    })
    .catch((err) => console.log("ERROR::", err));
});
router.post("/crearCampania", (req, res) => {
  const{
    new_Campania,
    name_Gerente,
    name_Gerenteope,
    name_Jefeope,
    name_coordinador,
    name_supervisor,
  } = req.body
  const newCampania={
    EST_CCONSULTA:"cmbCampaña",
    EST_CDETALLE:"",
    EST_CDETALLE1:new_Campania,
    EST_CDETALLE2:"",
    EST_CDETALLE3:"",
    EST_CDETALLE4:"",
    EST_CDETALLE5:"",
    EST_CDETALLE6:"",
    EST_CDETALLE7:"",
    EST_CDETALLE_REGISTRO:"Registro Por Sistema",
    EST_CESTADO:"Activo",
  }

  const sqlNewCampania = "INSERT INTO dbp_nomina.TBL_RESTANDAR SET ?";
  db.promise()

    .query(sqlNewCampania, [newCampania])
    .then(([result]) => {
      // console.log(result);
    })
    .catch((err) => console.log("ERROR::", err));

  res.send("recibido");
});


// ---------------------------CARGOS-----------------
router.get("/crearCargo", (req, res) => {
  const sqlAreas = "SELECT EST_CDETALLE1 FROM dbp_nomina.TBL_RESTANDAR WHERE EST_CCONSULTA='cmbCargo' GROUP BY EST_CDETALLE1 ORDER BY EST_CDETALLE1 asc";
  db.promise()

    .query(sqlAreas)
    .then(([resultAreas]) => {
      const sqlTipoCargo = "SELECT EST_CDETALLE2 FROM dbp_nomina.TBL_RESTANDAR WHERE EST_CCONSULTA='cmbCargo' GROUP BY EST_CDETALLE2 ORDER BY EST_CDETALLE2 asc";
      db.promise()

        .query(sqlTipoCargo)
        .then(([resultTipoCargo]) => {
          res.render("nomina/crearCargo", { title: "Crear Cargo", dataAreas: resultAreas, dataTipoCargo: resultTipoCargo });
        })
        .catch((err) => console.log("ERROR::", err));
    })
    .catch((err) => console.log("ERROR::", err));
});

router.post("/crearCargo", (req, res) => {
  const { cargo_nombre, cargo_area, cargo_tipo } = req.body;

  const newCargo = {
    EST_CCONSULTA: "cmbCargo",
    EST_CDETALLE: cargo_nombre,
    EST_CDETALLE1: cargo_area,
    EST_CDETALLE2: cargo_tipo,
    EST_CDETALLE3: "",
    EST_CDETALLE4: "",
    EST_CDETALLE5: "",
    EST_CDETALLE6: "",
    EST_CDETALLE7: "",
    EST_CDETALLE_REGISTRO: "Registro por formulario",
    EST_CESTADO: "Activo",
  };
  const sqlnewCargo = "INSERT INTO dbp_nomina.TBL_RESTANDAR SET ?";
  db.promise()

    .query(sqlnewCargo, [newCargo])
    .then(([result]) => {
      // console.log(result);
      res.redirect("/inicio");
    })
    .catch((err) => console.log("ERROR::", err));
});

router.get("/listaCargos", (req, res) => {
  const sqlCargos = "SELECT * FROM dbp_nomina.TBL_RESTANDAR WHERE EST_CCONSULTA = 'cmbCargo' ORDER BY EST_CDETALLE asc";
  db.promise()

    .query(sqlCargos)
    .then(([result]) => {
      for (let i = 0; i < result.length; i++) {
        result[i].EnCrypt = Class2.EnCrypt(`${result[i].PKEST_NCODIGO}`);
      }
      res.render("nomina/listaCargos", { title: "Lista Cargos", cargos: result });
    })
    .catch((err) => console.log("ERROR::", err));
});

router.get("/actualizarCargo/:id", (req, res) => {
  let id = DeCrypt(req.params.id);
  const sqlCargos = "SELECT * FROM dbp_nomina.TBL_RESTANDAR WHERE PKEST_NCODIGO=?";
  db.promise()

    .query(sqlCargos, [id])
    .then(([resultCargos]) => {
      const sqlCargosAreas = "SELECT EST_CDETALLE1 FROM dbp_nomina.TBL_RESTANDAR WHERE EST_CCONSULTA='cmbCargo' GROUP BY EST_CDETALLE1 ORDER BY EST_CDETALLE1 asc";
      db.promise()

        .query(sqlCargosAreas)
        .then(([resultAreas]) => {
          const sqlCargosTipo = "SELECT EST_CDETALLE2 FROM dbp_nomina.TBL_RESTANDAR WHERE EST_CCONSULTA='cmbCargo' GROUP BY EST_CDETALLE2 ORDER BY EST_CDETALLE2 asc";
          db.promise()

            .query(sqlCargosTipo)
            .then(([resultTipo]) => {
              res.render("nomina/actualizarCargo", { title: "Actualizar Cargos", idEncrypt: req.params.id, cargos: resultCargos[0], dataAreas: resultAreas, dataTipo: resultTipo });
            })
            .catch((err) => console.log("ERROR::", err));
        })
        .catch((err) => console.log("ERROR::", err));
    })
    .catch((err) => console.log("ERROR::", err));
});

router.post("/getCragoID", (req, res) => {
  const sqlUsuarios = "SELECT * FROM dbp_nomina.TBL_RESTANDAR WHERE PKEST_NCODIGO = ?";
  let id = req.body.id;
  db.promise()

    .query(sqlUsuarios, [id])
    .then(([result]) => {
      // res.send(result[0]);
      res.json(result[0]);
    })
    .catch((err) => console.log("ERROR::", err));
});

router.post("/actualizarCargo/:id", (req, res) => {
  let id = DeCrypt(req.params.id);
  const { cargo_nombre, cargo_area, cargo_tipo } = req.body;

  const newCargo = {
    EST_CCONSULTA: "cmbCargo",
    EST_CDETALLE: cargo_nombre,
    EST_CDETALLE1: cargo_area,
    EST_CDETALLE2: cargo_tipo,
    EST_CDETALLE3: "",
    EST_CDETALLE4: "",
    EST_CDETALLE5: "",
    EST_CDETALLE6: "",
    EST_CDETALLE7: "",
    EST_CDETALLE_REGISTRO: "Registro por formulario",
    EST_CESTADO: "Activo",
  };
  const sqlnewCargo = "UPDATE dbp_nomina.TBL_RESTANDAR SET ? WHERE PKEST_NCODIGO = ?";
  db.promise()

    .query(sqlnewCargo, [newCargo, id])
    .then(([result]) => {
      // console.log(result);
      // req.flash("messageSuccess", `Cargo Actualizado`);
      res.redirect("/nomina/listaCargos");
    })
    .catch((err) => console.log("ERROR::", err));
});

//NOMINA
//usuarios
router.get("/nomListUsers", (req, res) => {
  const sqlUsuarios = "SELECT * FROM dbp_nomina.TBL_RCONTENIDO";

  db.promise()
    .query(sqlUsuarios)
    .then(([resultUsuarios]) => {
      // res.send(resultUsuarios);
      res.render("nomina/nomListUsers", { title: "Nomina Usuarios", usuarios: resultUsuarios });
    });
});

async function verificarCampanas() {
  const sqlCampanias = "SELECT EST_CDETALLE1 FROM dbp_nomina.TBL_RESTANDAR WHERE EST_CCONSULTA='cmbCampaña' ORDER BY EST_CDETALLE1 asc";

  db.promise()
    .query(sqlCampanias)
    .then(async ([resultCampanias]) => {
      let countCampanias = [];

      ArrayCampanas = [];
      for (let index = 0; index < resultCampanias.length; index++) {
        const sqlCountCampanias = "SELECT count(*) as numero from dbp_nomina.TBL_RCONTENIDO WHERE CON_CDETALLE2 = ?";

        // console.log(element.EST_CDETALLE1);
        await db
          .promise()
          .query(sqlCountCampanias, resultCampanias[index].EST_CDETALLE1)
          .then(([resultCountCampanias2]) => {
            countCampanias.push(resultCountCampanias2[0].numero);
          });
      }
      res.render("nomina/nomListCampanas", { title: "Nomina Campañas", campanias: resultCampanias, countCampanias });
    });
}

//Campañas
router.get("/nomListCampanas", (req, res) => {
  const sqlCampanias = "SELECT EST_CDETALLE1 FROM dbp_nomina.TBL_RESTANDAR WHERE EST_CCONSULTA='cmbCampaña' ORDER BY EST_CDETALLE1 asc";

  db.promise()
    .query(sqlCampanias)
    .then(async ([resultCampanias]) => {
      let countCampanias = [];

      ArrayCampanas = [];
      for (let index = 0; index < resultCampanias.length; index++) {
        const sqlCountCampanias = "SELECT count(*) as numero from dbp_nomina.TBL_RCONTENIDO WHERE CON_CDETALLE2 like '%"+resultCampanias[index].EST_CDETALLE1+"%'";
        
        await db
          .promise()
          .query(sqlCountCampanias, resultCampanias[index].EST_CDETALLE1)
          .then(([resultCountCampanias2]) => {
            if (resultCountCampanias2[0].numero != null) {
              let campania = {
                campania:resultCampanias[index].EST_CDETALLE1,
                numero: resultCountCampanias2[0].numero,
                dinero: 0
              }
              countCampanias.push(campania);
            }
          });
      }
      const sqlDinero = "SELECT CON_CDETALLE2 as campania, CON_CDETALLE50 as dinero FROM dbp_nomina.TBL_RCONTENIDO ORDER BY CON_CDETALLE2";

        await db
          .promise()
          .query(sqlDinero)
          .then(([resultPersona]) => {
            var indexCountCamp = [0,""];
            var persona = {dinero:0,campanias:[], total:0};
            //Recorrer cada persona
            for (let index = 0; index < resultPersona.length; index++) {
              persona.campanias = [];
              persona.total = 0;
              persona.dinero = parseInt(resultPersona[index].dinero);
              //generar array por si la persona tiene mas de 1 campania asignada
              campania = resultPersona[index].campania.split(",");

              //Recorrer las campanias de la persona
              for (let i = 0; i < campania.length; i++) {
                
                //Si la campania actual de la persona es igual a la temporal
                if (campania[i] == indexCountCamp[1]){
                  persona.total +=countCampanias[indexCountCamp[0]].numero;
                  persona.campanias.push([campania[i], countCampanias[indexCountCamp[0]].numero]);
                }else{
                  //Buscar la nueva campania
                  for (let b = 0; b < countCampanias.length; b++) {
                    //Si la campania del conteo es igual a la de la persona actual
                    if(countCampanias[b].campania == campania[i]){
                      indexCountCamp[0] = b;
                      indexCountCamp[1] = countCampanias[b].campania;
                      i --;
                      //console.log(indexCountCamp);
                      break;
                    }
                    
                  }
                }

              }
              
            for (let c = 0; c < persona.campanias.length; c++) {
              var dinero = 0;
              var porcet = 0;
              porcet = (parseInt(persona.campanias[c][1])/persona.total)*100;
              dinero = (porcet*persona.dinero)/100;
              if (persona.campanias[c][0] == indexCountCamp[1]){
                countCampanias[indexCountCamp[0]].dinero += dinero;
              
              }else{
              //Buscar la nueva campania
                for (let b = 0; b < countCampanias.length; b++) {
                  //Si la campania del conteo es igual a la de la persona actual
                  if(countCampanias[b].campania == persona.campanias[c][0]){
                    indexCountCamp[0] = b;
                    indexCountCamp[1] = countCampanias[b].campania;
                    c --;
                    break;
                  }
                }  
              }
            }
            }  
          });
      //console.log(countCampanias);
      res.render("nomina/nomListCampanas", { title: "Nomina Campañas", countCampanias });
    });
});

// router.get("/nomListCampanas", (req, res) => {
//   const sqlCampanias = "SELECT EST_CDETALLE1 FROM dbp_nomina.TBL_RESTANDAR WHERE EST_CCONSULTA='cmbCampaña' ORDER BY EST_CDETALLE1 asc";

//   db.promise()
//     .query(sqlCampanias)
//     .then(async ([resultCampanias]) => {
//       let countCampanias = [];

//       ArrayCampanas = [];
//       for (let index = 0; index < resultCampanias.length; index++) {
//         const sqlCountCampanias = "SELECT CON_CDETALLE2, count(*) as numero from dbp_nomina.TBL_RCONTENIDO WHERE CON_CDETALLE2 = ?";

//         // console.log(element.EST_CDETALLE1);
//         await db
//           .promise()
//           .query(sqlCountCampanias, resultCampanias[index].EST_CDETALLE1)
//           .then(([resultCountCampanias2]) => {
//             if (resultCountCampanias2[0].CON_CDETALLE2 != null) {
//               countCampanias.push(resultCountCampanias2);
//             }
//           });
//       }
//       console.log(countCampanias);
//       res.render("nomina/nomListCampanas", { title: "Nomina Campañas", countCampanias });
//     });
// });

// router.get("/nomListCampanas", (req, res) => {
//   const sqlCampañas = "SELECT EST_CDETALLE1 FROM dbp_nomina.TBL_RESTANDAR WHERE EST_CCONSULTA='cmbCampaña' ORDER BY EST_CDETALLE1 asc";

//   db.promise()
//   .query(sqlCampañas)
//   .then(([resultCampañas]) => {
//     // res.send(resultUsuarios);
//     res.render("nomina/nomListCampanas", { title: "Nomina Campañas", campañas:resultCampañas});
//   })
//   .catch((err) => console.log("ERROR::", err));

// });

// router.get("/listaUsuarios", (req, res) => {
//   const sqlUsuarios = "SELECT * FROM dbp_nomina.TBL_RCONTENIDO";
//   db.promise()

//     .query(sqlUsuarios)
//     .then(([result]) => {
//       for (let i = 0; i < result.length; i++) {
//         result[i].EnCrypt = Class2.EnCrypt(`${result[i].PKCON_NCODIGO}`);
//       }
//       res.render("nomina/listaUsuarios", {title: "Lista Usuario", usuarios: result });
//     })
//     .catch((err) => console.log("ERROR::", err));
// });

module.exports = router;
