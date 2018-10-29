var nodemailer = require('nodemailer');
var register_schema = require('./register_schema');
var Promise = require('promise');
var post_schema = require('./post_schema');
var category_schema = require('./category_schema');

module.exports = {

    verify : function(data) {

        return new Promise((resolve,reject) => {
            register_schema.findOneAndUpdate({_id : data.id},{verified : true},function(err,result){
                if(err)
                {
                    console.log(err);
                    reject(err);
                }
                else
                {
                    console.log(result);
                    resolve('ok');
                }
            })
        })
    },

    login : function(data) {
        return new Promise((resolve,reject) => {
            register_schema.find({email : data.email}, function(err,result){
                if(err)
                {
                    console.log(err);
                    reject('err');
                }
                else
                {
                    console.log(result);
                    if(result.length > 0)
                    {
                        register_schema.find({email : data.email , password : data.password}, function(err,result){
                            if(err)
                            {
                                console.log(err);
                                reject('err');
                            }
                            if(result.length > 0){
                                if(result[0].verified == false)
                                {
                                    console.log('not_verified');
                                    resolve('not_verified');
                                }
                                else{
                                    var response = {res : 'ok', data : result}
                                    resolve(response);
                                }
                            }
                            else{
                                resolve('incorrect_password');
                            }
                        })
                    }
                    else
                        resolve('no');
                }
            })
        })




    },

    register : function(data) {
        return new Promise((resolve,reject) => {
            register_schema.find({email : data.email},function(err,result){
                if(err)
                {
                    console.log(err);
                    reject('err');
                }
                else if(result.length > 0)
                {
                    console.log('user exists');
                    resolve('exists');
                }
                else
                {
                    register_schema.create({username : data.username, password : data.password, email : data.email, fname : data.fname, lname : data.lname} , function(err,result){
                        if(err)
                        {
                            console.log(err);
                            reject('err');
                        }
                        else
                        {
                            console.log(result);
                            let transporter = nodemailer.createTransport({
                                service:'Gmail',
                                  secure: true, 
                                  auth: {
                                      user: 'kartikjain1@mrei.ac.in',
                                      pass: 'justjoking'
                                  }
                              });
                              let mailOptions = {
                                  from : 'kartikjain1@mrei.ac.in', 
                                  to : result.email, 
                                  subject : 'verification code', 
                                  text : 'Please verify your mail id by click this link : http://localhost:3000/verify/'+result.id
                              };
                              transporter.sendMail(mailOptions, (error, info) => {
                                  if (error) {
                                      return console.log("error mail",error);
                                  }
                                  else
                                  console.log('Message %s sent: %s', info.messageId, info.response);
                              });
                            resolve('ok')
                        }
                    })
                }
            })
        })
    },

    forgot_password : function(data){
        return new Promise((resolve,reject) => {
            register_schema.find({email : data.email},function(err,result){
                if(err)
                {
                    console.log(err);
                    reject('err');
                }
                else
                {
                    if(result.length > 0)
                    {
                        console.log(result);
                        let transporter = nodemailer.createTransport({
                            service:'Gmail',
                              secure: true, 
                              auth: {
                                  user: 'kartikjain1@mrei.ac.in',
                                  pass: 'justjoking'
                              }
                          });
                          let mailOptions = {
                              from : 'kartikjain1@mrei.ac.in', 
                              to : result[0].email, 
                              subject : 'Forgot Password', 
                              text : 'Please change your password by click this link : http://localhost:3000/new_password/'+result[0].id
                          };
                          transporter.sendMail(mailOptions, (error, info) => {
                              if (error) {
                                  return console.log("error mail",error);
                              }
                              else
                              console.log('Message %s sent: %s', info.messageId, info.response);
                          });
                          resolve('ok');
                    }
                    else
                    {
                        console.log('mail id not found');
                        resolve('not_exists');
                    }
                }
            })
        }
    )},

    new_password : function(data) {
        return new Promise((resolve,reject) => {
            register_schema.findOneAndUpdate({_id : data.id},{password : data.password},function(err,result){
                if(err)
                {
                    console.log(err)
                    reject('err');
                }
                else
                {
                    console.log(result);
                    resolve('ok');
                }
            })
        })
    },

    upload_post : function(data,data_file){
        var d = new Date;
        var day = d.getDate();
        var m = d.getMonth();
        var month = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
        month = month[m];
        var year = d.getFullYear();
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var amorpm = 'AM'
        if(hours > 12)
        {
            amorpm = 'PM';
            hours = hours - 12;
        }
        d = day + ' ' + month + ' ' + year + '        ' + hours + ':' + minutes + ' ' + amorpm;
        return new Promise((resolve,reject) => {
            post_schema.create({fname : data.fname , lname : data.lname, caption : data.caption , imageName : data_file.filename, category : data.category, date : d, username : data.username}, function(err,result){
                if(err)
                {
                    console.log(err);
                    reject('err');
                }
                else
                {
                    console.log(result);
                    resolve('ok');
                }
            })
        })
    },

    upload_category : function(data,data_file){
        return new Promise((resolve,reject) => {
            category_schema.create({imageName : data_file.filename, category : data.category}, function(err,result){
                if(err)
                {
                    console.log(err);
                    reject('err');
                }
                else
                {
                    console.log(result);
                    resolve('ok');
                }
            })
        })
    },

    fetch_category : function(data){
        return new Promise((resolve,reject) => {
            category_schema.find({}, function(err,result){
                if(err)
                {
                    console.log(err);
                    reject('err');
                }
                else
                {
                    let a = {re : 'ok', body : result};
                    console.log(result);
                    resolve(a);
                }
            })
        })
    },

    fetch_post : function(data){
        return new Promise((resolve,reject) => {
            post_schema.find({}, function(err,result){
                if(err)
                {
                    console.log(err);
                    reject('err');
                }
                else
                {
                    let b = {re : 'ok', body : result};
                    console.log(result);
                    resolve(b);
                }
            })
        })
    },

    likes_handler : function(data){
        return new Promise((resolve,reject) => {
            post_schema.find({_id:data.id}, function(err,result){
                if(err)
                {
                    console.log(err);
                    reject('err');
                }
                else
                {
                    var check = result[0].likes.indexOf(data.id2);
                    if(check == -1)                    
                    {
                        result[0].likes.push(data.id2);
                        console.log(result[0].likes);
                        post_schema.findOneAndUpdate({_id:data.id},{likes : result[0].likes},function(err,result){
                            if(err)
                            {
                                console.log(err);
                                reject('err');
                            }
                            else
                            {
                                console.log(result);
                                resolve('ok');
                            }
                        })
                    }
                    else
                    {
                        result[0].likes.splice(check, 1);
                        post_schema.findOneAndUpdate({_id:data.id},{likes : result[0].likes},function(err,result){
                            if(err)
                            {
                                console.log(err);
                                reject('err');
                            }
                            else
                            {
                                console.log(result);
                                resolve('ok');
                            }
                        })
                    }
                    
                }
            })
        })
    },

    comment_handler : function(data) {
        return new Promise((resolve,reject) => {
            post_schema.find({_id : data.id},function(err,result){
                if(err)
                {
                    console.log(err);
                    reject(err);
                }
                else
                {
                    var c = {username : data.username, comment : data.comment};
                    var comment = result[0].comment;
                    comment.push(c);
                    console.log('comment',comment);
                    post_schema.findOneAndUpdate({_id : data.id},{comment : comment},function(err,result){
                        if(err)
                        {
                            console.log(err);
                            reject('err');
                        }
                        else
                        {
                            console.log(result);
                            resolve('ok');
                        }
                    })
                }
            })
        })
    },

    fetch_comment : function(data){
        return new Promise((resolve,reject) => {
            post_schema.findOne({_id :data.id }, function(err,result){
                if(err)
                {
                    console.log(err);
                    reject('err');
                }
                else
                {
                    let b = {re : 'ok', body : result.comment};
                    console.log(result);
                    resolve(b);
                }
            })
        })
    }













}