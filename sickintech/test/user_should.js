const User = require('../models/User');
const expect = require('chai').expect;
const validator = require ('validator');
const utils = require('./utils');

describe('User', function() {
    it('should have valid email', (done) => {
        var user = new User({ username: 'testuser', email: 'test@email.com' });
        var errors = user.validateSync();
        expect(errors).to.not.exist;
        done();
    });

    it('should error on invalid email', (done) => {
        var user = new User({ username: 'testuser', email: '$$^$.com' });
        var errors = validator.isEmail(user.email);
        expect(errors).to.false;
        done();
    });

    it('should error on no email', (done) => {
        var user = new User({ username: 'testuser' });
        var errors = user.validateSync();
        expect(errors.errors.email).to.exist;
        done();
    });
    
    it('should have a valid username', (done) => {
        var user = new User({ username: 'testuser', email: 'test@email.com' });
        var errors = user.validateSync();
        expect(errors).to.not.exist;
        done();
    });

    it('should error on invalid username', (done) => {
        var user = new User({ username: 'tes$$tuser', email: 'test@email.com' });
        var errors = user.validateSync();
        expect(errors.errors.username).to.exist;
        done();
    });

    it('should error on no username', (done) => {
        var user = new User({ email: 'test@email.com' });
        var errors = user.validateSync();
        expect(errors.errors.username).to.exist;
        done();
    });

});
