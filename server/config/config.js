//This file holds any configuration variables we may need 
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there

module.exports = {
  db: {
    uri: "mongodb://user2:user2password@ds243212.mlab.com:43212/ufwebapp", //place the URI of your mongo database here.
  }, 
  openCage: {
    key: '3678fb60140149ff9e6bea089515e277'
  },
  port: 8080
};