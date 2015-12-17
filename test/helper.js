const fse = require('fs-extra')

module.exports = {
  overwriteDb: (dbName) => {
    fse.copySync(__dirname + `/databases/${dbName}.json`, __dirname + '/db.json')
  }
}