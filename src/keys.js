
var Class2 = require("./public/js/Class2")

//// Variables de usuario active directorty
url = Class2.DeCrypt('41785A3241514C6B416D4E6D444757545A784C32416D706C41784C334147706A41775A324577706D5A7848325A6D4D544178443D')
baseDN = Class2.DeCrypt('415144305A6D4152417770335A774D54416D48335A514C6D41784C335A6D5751415144305A6D415241775A3245774D52')
username = ''
password = ''

domain = Class2.DeCrypt('41514E32416D706C41784C334147706A41775A324577706D5A7848325A6D4D544178443D')
module.exports = {
  database: {
    host: Class2.DeCrypt("5A6D526D416D5A6C5A7A486D416D5A6A5A7A486D416D57795A6D526D41443D3D"),
    user: Class2.DeCrypt("41775A324577706D41484C325A6D706C4178443D"),
    password: Class2.DeCrypt("417770324147706D416D443242474D5441784832416D4C31417848324147706C41775232446D4C6D41784C335A6D414F5A6D566D5A515A6C5A6D4E3D"),
    database: Class2.DeCrypt("417744325A77706A414A4C324D474D7A417A443242474D794177523D")
  },
      // Variables de configuracion de active directory
      config:{
        url: url,
        baseDN: baseDN,
        username: username,
        password: password,

    },
    domain

}
