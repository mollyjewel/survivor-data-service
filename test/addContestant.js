const   expect      = require('chai').expect,
        request     = require('supertest'),
        basicSetup  = require('./helper/basicSetup'),
        server         = require('../server')
        contestant = require('./helper/contestant');

describe('POST: /api/contestants route to insert data', ()=>{
    basicSetup();         // imported from test/helpers/basicSetup.js

    it('full valid data', (done)=>{            // test case 1
        request(server).post('/api/contestants')
            .send(contestant.fullInfoInput)
            .then((res)=>{
              console.log(res);
                expect(res.statusCode).to.equal(201);
                let output = res.body;
                delete output["_id"];
                delete output ["createdAt"];
                delete output["updatedAt"];
                delete output["__v"];
                expect(output).to.deep.equal(contestant.fullInfoOutput);
                done();
            })
            .catch((err) => done(err))
    })

    it('no firstName field given', (done)=>{ 
        request(server).post('/api/contestants')
            .send({lastName: "Anderson"})
            .then((res)=>{
                expect(res.statusCode).to.equal(400)
                expect(res.body).to.be.an('object')
                done()
            })
            .catch((err) => done(err))
    })

    it('invalid gender field given', (done)=>{
        request(server).post('/api/contestants')
            .send({firstName: "Natalie", lastName: "Anderson", gender: "alien"})
            .then((res)=>{
                expect(res.statusCode).to.equal(400)
                expect(res.body).to.be.an('object')
                done()
            })
            .catch((err) => done(err))
    })
})
