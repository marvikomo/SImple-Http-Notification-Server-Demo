"use strict"

/**
 *
 * Index Controllers
 */


const {encrypt, decrypt} = require('../helpers/Encryption');
const {sendResponse} = require('../helpers/ResponseHelper');
const { randomBytes } = require('crypto');
const { json } = require('body-parser');
const axios = require('axios');
const topics = {};
const subscribers = [];

//asuming there is one publisher server for client to send to topic
class IndexController {
 
    static async handleEvent(req, res)
    {
        try{
           
            let event = req.body;
            const id = randomBytes(4).toString('hex'); //assign ids to each topic
            //checks if event is 'AddTopic'
            if(event.type == 'AddTopic')
            {
                topics[event.data.topic] = {
                    id,
                    name: event.data.topic
                }

                return sendResponse(res, 200, false, "", "Topic added successfully");

            }else if(event.type == 'Subscribe'){

                let topic = event.data.topic
                let url = event.data.url

                //check if topic exists 
                if(topics[topic])
                {
                    let id = topics[topic].id
                    let subscriber_data = {
                        id,
                        url
                    }
    
                    //check if a server has subscribed before
    
                    let result = await subscribers.filter(e => {
                        return e.id == id && e.url == url
                    })
                    if(result.length > 0)
                    {
                        console.log("already subscribed")
                        return sendResponse(res, 200, false, "", "You have successfuly subscribed");
                    }else{
                        subscribers.push(subscriber_data)
                        return sendResponse(res, 200, false, "", "You have successfuly subscribed");

                    }
                    
        
                }else{
                    return sendResponse(res, 200, true, "", "Topic does not exist");
                }
                
            
            
              
            }
           
            

        }catch(err)
        {
          console.log(err)
          sendResponse(res, 500, err)
        }
    }


    static async publish(req, res)
    {
        
        try{
            let topic = req.params.topic
            //check if topic exists 
            let {data} = req.body;
           
            if(topics[topic])
            {
               let id = topics[topic].id;
               //console.log(subscribers)
               let result = await subscribers.filter(e=>{
                   return e.id == id
               
                })

               //check if result contains elements
               if(result.length > 0)
               {
               
                   await result.forEach( async (e) => {
                       let url = e.url
                       console.log(url)
                       await axios.post(url, {
                       
                         data
                      
                    }).catch(err=>{
                        console.log(err)
                    });
                   })
               }

               return sendResponse(res, 200, false, "", "Published Successfully");
            }else{
                return sendResponse(res, 403, true, "", "Topic does not exist");
            }

            

            

        }catch(err)
        {
            console.log(err)
            sendResponse(res, 500, err)
        }
    }

   

}

module.exports = IndexController;
