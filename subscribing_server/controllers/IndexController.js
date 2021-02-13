"use strict"

/**
 *
 * Index Controllers
 */


const {encrypt, decrypt} = require('../helpers/Encryption');
const {sendResponse} = require('../helpers/ResponseHelper');
const {addhttp} = require('../helpers/Generic');
const axios = require('axios');

const topic = [];

class IndexController {

    static async addTopic(req, res)
    {
        try{
            let {topic} = req.body
            
            topic = topic.replace(/\s/g, "")
           
            let result = await axios.post('http://publishing_server:8001/publish/event', {
                  type:'AddTopic',
                  data: {
                      topic
                  }
                
              });
             if(result.data.error == false)
             {
                return sendResponse(res, 200, false, '', result.data.message);
             }

        }catch(err)
        {
            console.log(err);
            sendResponse(res, 500, err)

        }
    }

    static async subscribe(req, res) {
        try {
            
            let {url} = req.body;
            let topic = req.params.topic
            url = addhttp(url)
           
            //let host = req.headers.host;
            let result = await axios.post('http://publishing_server:8001/publish/event', {
                  type:'Subscribe',
                  data:{
                      topic,
                      url
                  }
                 
                
              });
              let response = {
                  url, topic
              }
              if(result.data.error)
              {
                return sendResponse(res, 200, true, '', result.data.message);

              }else{
                return sendResponse(res, 200, false, response, "Subscribed Successfully");

              }
              

           
        } catch (err) {
            console.log(err);
            sendResponse(res, 500, err)
        }
    }

    static async receiveNotification(req, res)
    {
        try{

            console.log(req.body)


        }catch(err)
        {
            console.log(err);
        }
    }

   

}

module.exports = IndexController;
