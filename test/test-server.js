'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');


const expect = chai.expect;

chai.use(chaiHttp);

const {Brew} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');
const {User} = require('../users/models');
/*
function seedBrewData() {
    console.info('seeding brew data');
    const seedData = [];
    
    for (let i=1; i<=10; i++) {
        seedData.push(generateBrewData());
    }
    // this will return a promise
    return Brew.insertMany(seedData);
  }

  function generateBrewType() {
      const brewTypes = [
          'coffee', 'brewery'];
          return brewTypes[Math.floor(Math.random() * brewTypes.length)];
        }
        
        function generateBrewData() {
            return {
                title: faker.lorem.words(),
                type: generateBrewType(),
                content: faker.lorem.paragraph(),
                address: faker.lorem.words(),
                img: faker.lorem.words()
            };
        }
        
        function tearDownDb(){
            console.warn('Deleting database');
            return mongoose.connection.dropDatabase();
        }
        
        describe('brew API resource', function() {
            
            before(function() {
                return runServer(TEST_DATABASE_URL);
            });
            
            
            after(function() {
                return closeServer();
            });
            
            describe('GET endpoint', function() {
                
                it('should return all existing brew', function() {
                    
                    let res;
                    return chai.request(app)
                    .get('/brew')
                    .then(function(_res) {
                        res = _res;
                        expect(res).to.have.status(200);
                        expect(res.body.brew).to.have.length.of.at.least(1);
                        return Brew.count();
                    })
                    .then(function(count) {
                        expect(res.body.brew).to.have.length(count);
                      });
                  });
              
                  it('should return brew with right fields', function() {
              
                    let resBrew;
                    return chai.request(app)
                      .get('/brew')
                      .then(function(res) {
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        expect(res.body.brew).to.be.a('array');
                        expect(res.body.brew).to.have.length.of.at.least(1);
              
                        res.body.brew.forEach(function(brew) {
                          expect(brew).to.be.a('object');
                          expect(brew).to.include.keys(
                            'id', 'title', 'type', 'content', 'img', 'address', 'userId');
                        });
                        resBrew = res.body.brew[0];
                        return Brew.findById(resBrew.id);
                      })
                      .then(function(brew) {
              
                        expect(resBrew.id).to.equal(brew.id);
                        expect(resBrew.userId).to.equal(brew.userId);
                        expect(resBrew.title).to.equal(brew.title);
                        expect(resBrew.type).to.equal(brew.type);
                        expect(resBrew.content).to.equal(brew.content);
                        expect(resBrew.img).to.equal(brew.img);
                        expect(resBrew.address).to.equal(brew.address);
              
                      });
                  });
                });
              
                describe('POST endpoint', function() {
              
                  it('should add a new brew', function() {
              
                    const newBrew = generateBrewData();
              
                    return chai.request(app)
                      .post('/brew')
                      .send(newBrew)
                      .then(function(res) {
                        expect(res).to.have.status(201);
                        expect(res).to.be.json;
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.include.keys(
                          'id', 'title', 'type', 'content', 'img', 'address', 'userId');
                        expect(res.body.title).to.equal(newBrew.title);
                        expect(res.body.id).to.not.be.null;
                        expect(res.body.type).to.equal(newBrew.type);
                        expect(res.body.content).to.equal(newBrew.content);
                        expect(res.body.address).to.equal(newBrew.address);
                        expect(res.body.img).to.equal(newBrew.img)
              
                        return Brew.findById(res.body.id);
                      })
                      .then(function(brew) {
                        expect(brew.title).to.equal(newBrew.title);
                        expect(brew.type).to.equal(newBrew.type);
                        expect(brew.content).to.equal(newBrew.content);
                        expect(brew.address).to.equal(newBrew.address);
                        expect(brew.img).to.equal(newBrew.img);
                      });
                  });
                });
              
                describe('PUT endpoint', function() {
              
                  it('should update fields you send over', function() {
                    const updateData = {
                      title: 'New Brew',
                      content: 'This is a new brew for all of the foods.'
                    };
              
                    return Brew
                      .findOne()
                      .then(function(brew) {
                        updateData.id = brew.id;
              
                        return chai.request(app)
                          .put(`/brew/${brew.id}`)
                          .send(updateData);
                      })
                      .then(function(res) {
                        expect(res).to.have.status(204);
              
                        return Brew.findById(updateData.id);
                      })
                      .then(function(brew) {
                        expect(brew.title).to.equal(updateData.title);
                        expect(brew.content).to.equal(updateData.content);
                      });
                  });
                });
              
                describe('DELETE endpoint', function() {
              
                  it('delete a brew by id', function() {
              
                    let brew;
              
                    return Brew
                      .findOne()
                      .then(function(_brew) {
                        brew = _brew;
                        return chai.request(app).delete(`/brew/${brew.id}`);
                      })
                      .then(function(res) {
                        expect(res).to.have.status(204);
                        return Brew.findById(brew.id);
                      })
                      .then(function(_brew) {
                        expect(_brew).to.be.null;
                      });
                  });
                });
              });
     
            




            

            /*describe('GET endpoint', function() {
              before(function(){
                  return runServer(TEST_DATABASE_URL);
              });
              after(function(){
                  closeServer();
              });
            
              it('should return user', function() {
                  let user;
                  User.find({username: 'demo'})
                    .then(_user => {
                      user = _user;
                    })
                    .catch(error => {
                        console.log(error);
                    })
                let res;
                return chai.request(app)
                  .get('/user/' + user._id)
                  .then(function(_res) {
                    res = _res;
                    console.log(res);
                    expect(res).to.have.status(200);
                    expect(res.body.brew).to.have.length.of.at.least(1);
                    return Brew.count();
                  })
                  .then(function(count) {
                    expect(res.body.brew).to.have.length(count);
                  });
              });
            
              it('should return brew with right fields', function() {
            
                let resBrew;
                return chai.request(app)
                  .get('/brewlist')
                  .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.brew).to.be.a('array');
                    expect(res.body.brew).to.have.length.of.at.least(1);
            
                    res.body.brew.forEach(function(brew) {
                      expect(brew).to.be.a('object');
                      expect(brew).to.include.keys(
                        'userId', 'title', 'img', 'content', 'address', 'type');
                    });
                    resBrew = res.body.brew[0];
                    return Brew.findById(resBrew.id);
                  })
                  .then(function(brew) {
            
                    expect(resBrew.userId).to.equal(brew.userId);
                    expect(resBrew.title).to.equal(brew.title);
                    expect(resBrew.type).to.equal(brew.type);
                    expect(resBrew.content).to.equal(brew.content);
                    expect(resBrew.img).to.equal(brew.img);
                    expect(resBrew.address).to.contain(brewauthor.address);
            
                  });
              });
            });
            
            */