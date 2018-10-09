var mongoose = require('mongoose');

mongoose.connect('mongodb://ds125683.mlab.com:25683/rest-test-task', {
    auth: {
        user: 'root',
        password: 'UEAANujTtnB99jx3'
    },
    useNewUrlParser: true,
    useCreateIndex: true,
});