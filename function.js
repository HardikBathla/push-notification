var _ =require('underscore');
var FCM = require('fcm-push');
var fireBaseKey = "AAAA1KkSzw8:APA91bGDCG3pV_HS1cRwzfM5fR_OliT68hD4pfTSdP2UCFkHm35SStAjcWYPv7BQK8jv8YBdUhLfaBkYoy3UrFcOIwc6hU7XVCRiW1GLl4PqpJT7Eydkrpihca4EQbkIK9K2Wi7GvDlm"
const fcm = new FCM(fireBaseKey)
module.exports = {
 sendPush: async function() {
   const data = await db.collection('deviceToken').find().sort({userId:-1}).toArray()
    
     let deviceToken=  _.pluck(data, 'token');
     const tokenChunk = _.chunk(deviceToken, 1000);
     _.map(tokenChunk, (obj) => {
      var message = {
          registration_ids: obj,

          notification: {
              title: 'Push Notification Send',
              body:  "Notification Send Successfully"
          },

      };

      fcm.send(message, function(error, response){
          if (error) {

              console.log("Server is under Maintainance",error);
              return error
          } else {
              console.log("Successfully sent the Push Notification ", response);
              return response
          }
      });

});
      return "Push Sent Successfully";
}
}

