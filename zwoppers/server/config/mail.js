/**
 * Mandrill configuration
 */

'use strict';

var http = require('http');
var config = require('./environment');

exports.sendActivateAccountMessage = function(email, token){
        
    var toList = [
        {
            "email": email,
            "type": "to"
        }
    ];

    var templateContentList = [
        {
            "name": "url",
            "content": "<a href='"+config.mail.baseUrl+"login?t="+token+"'>"+config.mail.baseUrl+"login?t="+token+"</a>"
        }
    ];

    var msg = exports.constructMessage('Activate Your Account', toList, 'activate', templateContentList);

    exports.httpSend(msg);
}

exports.sendUpdateEmailMessage = function(email, token){
    
    var toList = [
        {
            "email": email,
            "type": "to"
        }
    ];

    var templateContentList = [
        {
            "name": "url",
            "content": "<a href='"+config.mail.baseUrl+"login?t="+token+"'>"+config.mail.baseUrl+"login?t="+token+"</a>"
        }
    ];

    var msg = exports.constructMessage('Update Your Email', toList, 'update-email', templateContentList);

    exports.httpSend(msg);
}

exports.sendResetPasswordMessage = function(email, token){
    
    var toList = [
        {
            "email": email,
            "type": "to"
        }
    ];

    var templateContentList = [
        {
            "name": "url",
            "content": "<a href='"+config.mail.baseUrl+"reset?t="+token+"'>"+config.mail.baseUrl+"reset?t="+token+"</a>"
        }
    ];

    var msg = exports.constructMessage('Reset Your Password', toList, 'reset-password', templateContentList);

    exports.httpSend(msg);
}

exports.constructMessage = function(subject, toList, templateName, templateContentList, tagsList){
    var message = {
        "key": config.mail.mandrillKey,
        "template_name": templateName,
        "template_content": templateContentList,
        "message": {
            "html": "",
            "text": "",
            "subject": subject,
            "from_email": "donotreply@zwoppers.com",
            "from_name": "The Zwoppers Team",
            "to": toList,
            "headers": {
                // "Reply-To": "message.reply@example.com"
            },
            "important": true,
            "track_opens": null,
            "track_clicks": null,
            "auto_text": null,
            "auto_html": null,
            "inline_css": null,
            "url_strip_qs": null,
            "preserve_recipients": null,
            "view_content_link": null,
            //"bcc_address": "message.bcc_address@example.com",
            "tracking_domain": null,
            "signing_domain": null,
            "return_path_domain": null,
            "merge": false,
            "global_merge_vars": [
                {
                    "name": "logourl",
                    "content": config.mail.baseUrl+"images/zwoppers_logo.png"
                }
            ],
            // "merge_vars": [
            //     {
            //         "rcpt": "recipient.email@example.com",
            //         "vars": [
            //             {
            //                 "name": "merge2",
            //                 "content": "merge2 content"
            //             }
            //         ]
            //     }
            // ],
            "tags": tagsList,
            // "subaccount": "customer-123",
            // "google_analytics_domains": [
            //     "example.com"
            // ],
            // "google_analytics_campaign": "message.from_email@example.com",
            // "metadata": {
            //     "website": "www.example.com"
            // },
            // "recipient_metadata": [
            //     {
            //         "rcpt": "recipient.email@example.com",
            //         "values": {
            //             "user_id": 123456
            //         }
            //     }
            // ],
            // "attachments": [
            //     {
            //         "type": "text/plain",
            //         "name": "myfile.txt",
            //         "content": "ZXhhbXBsZSBmaWxl"
            //     }
            // ],
            // "images": [
            //     {
            //         "type": "image/png",
            //         "name": "IMAGECID",
            //         "content": "ZXhhbXBsZSBmaWxl"
            //     }
            // ]
        },
        "async": false,
        // "ip_pool": "Main Pool",
        // "send_at": "example send_at"
    }

    return message;
}


exports.httpSend = function(message){

    // Build the post string from an object
    var post_data = JSON.stringify(message);

    // An object of options to indicate where to post to
    var post_options = {
      host: config.mail.mandrillHost,
      path: config.mail.mandrillApiPath,
      port: config.mail.mandrillPort,
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
    });

    post_req.on('error', function(e) {
        console.log(e.message);            
    });

    // post the data
    post_req.write(post_data);

    post_req.end();

}