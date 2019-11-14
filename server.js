const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const cors = require('cors')
const app = express();

//http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz17jhsapuqyz_7oq0o&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA

app.get('/api', cors(), (req, res) => {

    const options = {
    url: `http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz17jhsapuqyz_7oq0o&address=${req.query.address}&citystatezip=${req.query.cityState}&rentzestimate=true`,
    };

    request(options, function (error, response, body) {
            let $ = cheerio.load(body);
            var zestimate = $('zestimate').first().find('amount').text()
            var rentZest =  ($('rentzestimate').find('amount').first().text())
            var zpid = $('zpid').first().text()

            res.json({
              zestimate: zestimate,
              rentZest: rentZest,
              zpid: zpid
            })
          })
  })

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server running...')
})