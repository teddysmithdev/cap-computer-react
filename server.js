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
            var rentZest = $('rentzestimate').find('amount').first().text()
            var fullAddress = $('street').first().text()
            var city = $('city').first().text()
            var zipCode = $('zipcode').first().text()
            var zpid = $('zpid').first().text()
            var bedrooms = $('bedrooms').first().text()
            var bathrooms = $('bathrooms').first().text()
            var sqft = $('finishedSqFt').first().text()
            var family = $('useCode').first().text()
            var lat = $('latitude').first().text()
            var long = $('longitude').first().text()
            console.log(fullAddress)
            res.json({
              zestimate: zestimate,
              rentZest: rentZest,
              zpid: zpid,
              fullAdress: fullAddress,
              city: city,
              zipCode: zipCode,
              bedrooms: bedrooms,
              bathrooms: bathrooms,
              sqft: sqft,
              family: family,
              lat: lat,
              long: long
            })
          })
  })

  if(process.env.NODE_ENV === 'production') {
    // Express will serve production assets
    // like main.js file, or main.css file!
    app.use(express.static('client/build'));
    //Express will server up the index.html file
    //
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  }
  

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server running...')
})