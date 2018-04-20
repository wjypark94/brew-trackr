'use strict';

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
      .get('/brewlist')
      .then(function(res){
        console.log(res.body);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
         const expectedKeys = ["id", "title", "type", "content", "img", "address", "userId"];
          res.body.forEach(item => {
              item.should.be.a('object');
              item.should.include.keys(expectedKeys);
          });
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
      };
      return chai.request(app)
      .get('/brewlist')
      .then(function(res) {
      updateData.id = res.body[0].id;
  
        return chai.request(app)
          .put(`/brewlist/${updateData.id}`)
          .send(updateData)
      })
      .then(function(res) {
        res.should.have.status(204);
      })
  });
  
  it("should delete items on DELETE", function() {
      return chai.request(app)
        .get("/brewlist")
        .then(function(res) {
          return chai.request(app).delete(`/brewlist/${res.body[0].id}`);
        })
        .then(function(res) {
          res.should.have.status(204);
          })
  });
});    


/*
function seedBrewData() {
   const seedData = [];
   console.log('seeding brew data');
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
            console.log('Deleting database');
            return mongoose.connection.dropDatabase();
        }
        
        describe('brew API resource', function() {
            
            before(function() {
                return runServer(TEST_DATABASE_URL);
            });

            beforeEach(function(){
              return seedTestData();
            });
      
            afterEach(function(){
              return tearDownTestDb();
            });
 
            after(function() {
                return closeServer();
            });
            
            describe('GET endpoint', function() {
                
                it('should return all existing brew', function() {
                    
                    let res;
                    return chai.request(app)
                    .get('/brewlist')
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
                      .get('/brewlist')
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
                      .post('/brewlist')
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
                          .put(`/brewlist/${brew.id}`)
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
                        return chai.request(app).delete(`/brewlist/${brew.id}`);
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