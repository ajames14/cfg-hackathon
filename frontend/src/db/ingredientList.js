const neatCsv = require('neat-csv')
const fs = require('fs')
const path = require('path')

fs.readFile(path.resolve(__dirname, 'top-1k-ingredients.csv'), async (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  await (neatCsv(data, { separator: ';' , headers: ['ingredient', 'id'] }))
    .then(data => {
      // console.log(data)
      const jsonData = JSON.stringify(data)
      // console.log(jsonData)
      fs.writeFile(path.resolve(__dirname, 'top-1k-ingredients.json'), jsonData, function(err) {
        if (err) {
          console.log(err)
        }
      })
    })
})
