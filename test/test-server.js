'use strict';
/*
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const {app, runServer, closeServer} = require('../server');
const {Brew} = require('../models');
const {TEST_DATABASE_URL} = require('../config');
const {User} = require('../users/models');
const uuidv1 = require('uuid/v1');
const should = chai.should();


const expect = chai.expect;
chai.use(chaiHttp);

describe('brew api resource', function(){
  before(function(){
      return runServer();
  });
  after(function(){
      return closeServer();
  }); 

  it('should get brew list on GET', function(){
      return chai.request(app)
      .get('/brewlist/user/5ad9400efe662025758f1ac3')
      .then(function(res){
        console.log(res.body);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
      });
  });

  it('should add brew on POST', function(){
      const newItem = {
          title: "Coffee Place",
          type:"Coffee",
          content:"Coffee is good",
          img:"coffee.png",
          address:"Los Angeles",
          userId: "userId"
      };
      return chai.request(app)
      .post('/brewlist')
      .send(newItem)
      .then(function(res){
          res.should.have.status(201);
          res.should.be.a.json;
          res.should.be.a('object');
          res.body.should.include.keys("id", "title", "type", "content", "img", "address");
          res.body.should.not.be.null;
          //res.body.should.deep.equal(Object.assign(newItem, {id: res.body.if}));
      });
  });

  it("should update item on PUT", function() {
      const updateData = {
          title: "Brew Place",
          type:"Brewery",
          content:"bar@foo.com",
          address: "Los Angeles",
          id: "5ad9449431c7fb270744eba0",
      };
      return chai.request(app)
      .put('/brewlist/5ad9449431c7fb270744eba0')
      .send(updateData)
      .then(function(res) {
        //console.log(res);
        res.should.have.status(204);
      });
  });
  
  /*it("should delete items on DELETE", function() {
      return chai.request(app)
        .delete("/brewlist")
        .then(function(res) {
          return chai.request(app).delete(`/brewlist/${res.body[0].id}`);
        })
        .then(function(res) {
          res.should.have.status(204);
          })
  });


});    
*/