'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');


const expect = chai.expect;

chai.use(chaiHttp);

const {Brew} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');


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

