const User = require('../models/User');
const Resource = require('../models/Resource');
const mongoose = require('mongoose');
const expect = require('chai').expect;

describe('Resource', () => {
    it('should create a valid resource', (done) => {
        var user = new User({ username: 'testuser', email: 'test@email.com' });
        user.save();
        var resource = new Resource({ 
            title: 'title',
            description: 'desc',
            link: 'http://link.com',
            category: ['Test Resource'],
            author: user._id
        });

        var errors = resource.validateSync();
        expect(errors).to.not.exist;
        done();
    });

    it('should error on empty user id', (done) => {
        var resource = new Resource({
            title: 'title',
            description: 'desc',
            link: 'http://link.com',
            category: ['test']
        });

        var errors = resource.validateSync();
        expect(errors.errors.author).to.exist;
        done();
    });

    it('should error on empty title', (done) => {
        var user = new User({ username: 'testuser', email: 'test@email.com' });
        user.save();
        var resource = new Resource({
            description: 'desc',
            link: 'http://link.com',
            category: ['test'],
            author: user._id
        });

        var errors = resource.validateSync();
        expect(errors.errors.title).to.exist;
        done();
    });

    it('should error on empty link', (done) => {
        var user = new User({ username: 'testuser', email: 'test@email.com' });
        user.save();
        var resource = new Resource({
            description: 'desc',
            title: 'test',
            category: ['test'],
            author: user._id
        });

        var errors = resource.validateSync();
        expect(errors.errors.link).to.exist;
        done();
    });

    it('should create a slug', (done) => {
        var user = new User({ username: 'testuser', email: 'test@email.com' });
        user.save();
        var resource = new Resource({ 
            title: 'title With lots of @#$ stuff',
            description: 'desc',
            link: 'http://link.com',
            category: ['Test Resource'],
            author: user._id
        });
        resource.validate();
        expect(resource.slug).to.equal('title-with-lots-of--stuff');
        done();
    });

    // it('should create unique slug', (done) => {
    //     var user = new User({ username: 'testuser', email: 'test@email.com' });
    //     user.save();
    //     var resource = new Resource({
    //         title: 'testing',
    //         description: 'desc',
    //         link: 'http://link.com',
    //         category: ['test'],
    //         author: user._id
    //     });
    //     resource.save();
    //     var resource2 = new Resource({
    //         title: 'testing',
    //         description: 'desc',
    //         link: 'http://link.com',
    //         category: ['test'],
    //         author: user._id
    //     });
    //     resource2.save();
    //     console.log(resource.slug, resource2.slug);
    //     expect(resource.slug).to.not.equal(resource2.slug);
    //     done();
    // })
});