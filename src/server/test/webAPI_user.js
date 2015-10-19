var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var sha1 = require('sha1');

describe('WEB', function () {
    
    function getRandomStr(){

        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    
    }

    var username1 = "test" + getRandomStr();
    var email1 = "test@test" + getRandomStr() + ".com";

    var username2 = "test" + getRandomStr() + 2;
    var email2 = "test@test" + getRandomStr() + "2.com";

    var password1 = "test" + getRandomStr();


    var wrongEmail = "badbad";


    var params1 = {
        username : username1,
        email : email1,
        password : password1,
        passwordConfirm : password1
    };

    describe('/user/signup GET', function () {
    
        it('Can signup', function (done) {
            
            request(app)
                .post('/api/v1/user/signup')
                .send(params1)
        		.expect('Content-Type', /json/)
        		.expect(200) 
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
    			
                res.body.should.have.property('success');
                res.body.success.should.equal(1);
                res.body.should.have.property('result');
                res.body.result.should.have.property('ok');
                res.body.result.ok.should.equal(true);

                done();
            
            });   
            
        });
        
        it('Duplicate username', function (done) {
            
            params1.username = username1;
            params1.email = "test@test" + + getRandomStr() + ".com";
            
            request(app)
                .post('/api/v1/user/signup')
                .send(params1)
        		.expect('Content-Type', /json/)
        		.expect(200) 
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
    			
                res.body.should.have.property('success');
                res.body.success.should.equal(1);
                res.body.should.have.property('result');
                res.body.result.should.have.property('validationError');
                
                done();
            
            });   
            
        });  

        it('Duplicate email', function (done) {
            
            params1.username = "test" + getRandomStr();
            params1.email = email1;
            
            request(app)
                .post('/api/v1/user/signup')
                .send(params1)
        		.expect('Content-Type', /json/)
        		.expect(200) 
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
    			
                res.body.should.have.property('success');
                res.body.success.should.equal(1);
                res.body.should.have.property('result');
                res.body.result.should.have.property('validationError');
                
                done();
            
            });   
            
        });

        it('Wrong email', function (done) {
            
            params1.username = "test" + getRandomStr();
            params1.email = wrongEmail;
            
            request(app)
                .post('/api/v1/user/signup')
                .send(params1)
        		.expect('Content-Type', /json/)
        		.expect(200) 
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
    			
                res.body.should.have.property('success');
                res.body.success.should.equal(1);
                res.body.should.have.property('result');
                res.body.result.should.have.property('validationError');
                
                done();
            
            });   
            
        }); 

        it('Wrong username ( length ) ', function (done) {
            
            params1.username = getRandomStr();
            params1.email = "test@test" + getRandomStr() + ".com";
            
            request(app)
                .post('/api/v1/user/signup')
                .send(params1)
        		.expect('Content-Type', /json/)
        		.expect(200) 
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
    			
                res.body.should.have.property('success');
                res.body.success.should.equal(1);
                res.body.should.have.property('result');
                res.body.result.should.have.property('validationError');
                
                done();
            
            });   
            
        }); 

        it('Wrong username ( alpha numerical )', function (done) {
            
            params1.username = "------";
            params1.email = "test@test" + getRandomStr() + ".com";
            
            request(app)
                .post('/api/v1/user/signup')
                .send(params1)
        		.expect('Content-Type', /json/)
        		.expect(200) 
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
    			
                res.body.should.have.property('success');
                res.body.success.should.equal(1);
                res.body.should.have.property('result');
                res.body.result.should.have.property('validationError');
                
                done();
            
            });   
            
        }); 
        
        it('Wrong password ( length )', function (done) {
            
            params1.username = "teset" + getRandomStr();
            params1.email = "test@test" + getRandomStr() + ".com";
            params1.password = "a";
            
            request(app)
                .post('/api/v1/user/signup')
                .send(params1)
        		.expect('Content-Type', /json/)
        		.expect(200) 
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
    			
                res.body.should.have.property('success');
                res.body.success.should.equal(1);
                res.body.should.have.property('result');
                res.body.result.should.have.property('validationError');
                
                done();
            
            });   
            
        }); 
        
        it('Wrong password ( alpha numerical  )', function (done) {
            
            params1.username = "teset" + getRandomStr();
            params1.email = "test@test" + getRandomStr() + ".com";
            params1.password = "------";
            
            request(app)
                .post('/api/v1/user/signup')
                .send(params1)
        		.expect('Content-Type', /json/)
        		.expect(200) 
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
    			
                res.body.should.have.property('success');
                res.body.success.should.equal(1);
                res.body.should.have.property('result');
                res.body.result.should.have.property('validationError');
                
                done();
            
            });   
            
        }); 
        
        it('Wrong password ( not same )', function (done) {
            
            params1.username = "teset" + getRandomStr();
            params1.email = "test@test" + getRandomStr() + ".com";
            params1.password = "test" + getRandomStr();
            params1.passwordConfirm = "test" + getRandomStr();
            
            request(app)
                .post('/api/v1/user/signup')
                .send(params1)
        		.expect('Content-Type', /json/)
        		.expect(200) 
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
    			
                res.body.should.have.property('success');
                res.body.success.should.equal(1);
                res.body.should.have.property('result');
                res.body.result.should.have.property('validationError');
                
                done();
            
            });   
            
        });     
      
    });
    
    describe('/user/signin GET', function () {
        
        it('Can signin', function (done) {
            
            var paramsLogin = {
                username : username1,
                password : sha1(password1)
            };
            
            request(app)
                .post('/api/v1/user/signin')
                .send(paramsLogin)
        		.expect('Content-Type', /json/)
        		.expect(200) 
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
    			
                res.body.should.have.property('success');
                res.body.success.should.equal(1);
                res.body.should.have.property('result');
                res.body.result.should.have.property('ok');
                res.body.result.ok.should.equal(true);

                done();
            
            });   
            
        });
        
    });

    describe('/user/resetpassword GET', function () {
        
        it('Can reset password', function (done) {
            
            var paramsLogin = {
                email : email1
            };
            
            request(app)
                .post('/api/v1/user/resetpassword')
                .send(paramsLogin)
        		.expect('Content-Type', /json/)
        		.expect(200) 
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
    			
                res.body.should.have.property('success');
                res.body.success.should.equal(1);
                res.body.should.have.property('result');
                res.body.result.should.have.property('ok');
                res.body.result.ok.should.equal(true);

                done();
            
            });   
            
        });

        it('Wrong email ', function (done) {
            
            var paramsLogin = {
                email : "testaaaaa@test.com"
            };
            
            request(app)
                .post('/api/v1/user/resetpassword')
                .send(paramsLogin)
        		.expect('Content-Type', /json/)
        		.expect(200) 
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
    			
                res.body.should.have.property('success');
                res.body.success.should.equal(1);
                res.body.should.have.property('result');
                res.body.result.should.have.property('ok');
                res.body.result.ok.should.equal(false);

                done();
            
            });   
            
        });
         
    });
        
    
});