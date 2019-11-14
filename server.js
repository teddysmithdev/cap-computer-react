const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const cors = require('cors')
const app = express();

//http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz17jhsapuqyz_7oq0o&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA

app.get('/api', cors(), (req, res) => {

    const options = {
    //https://www.google.com/search?q=elijah+privette+704
    url: `http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz17jhsapuqyz_7oq0o&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA&rentzestimate=true`,
    headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
            }
        };

    request(options, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            let $ = cheerio.load(body, { xmlMode: true });
            var zestimate = $('zestimate').find('amount').text()
            var rentZest =  ($('rentzestimate').find('amount').text())*12
            var zpid = $('zpid').text()
            console.log(zestimate, rentZest, zpid) 
            findTaxes(zpid)
            } else {
              console.log('connection error')
            }
      
        })
    });

const findTaxes = (zpid) => {
  const options = {
    //https://www.google.com/search?q=elijah+privette+704
    url: `https://www.zillow.com/homedetails/${zpid}_zpid`,
    headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
            }
      };

      request(options, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            let $ = cheerio.load(body);
            var taxes = $('.zsg-tab-panel zsg-tab_active').text()
            console.log(taxes) 
            } else {
              console.log('connection error')
            }
      
        })

}




const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server running...')
})