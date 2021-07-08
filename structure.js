const nsController = require('./controller/nscontroller');
const roomController = require('./controller/roomController');

let public = new nsController('/public','public')
let programing = new nsController('/programing','program')


public.addRoom(new roomController('friend','friend')),
public.addRoom(new roomController('coffeshop','coffeshop'))

programing.addRoom(new roomController('nodejs','node.js'))
programing.addRoom(new roomController('php','PHP'))
programing.addRoom(new roomController('pyton','Pyton'))
programing.addRoom(new roomController('go','Go'))


module.exports= [public,programing]