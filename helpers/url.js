module.exports = {
  root : function(req){
    return req.headers.referer.split(':')[0] + '://' + req.get('host');
  },
  documentUrl : function(req, dyno_id){
    return this.root(req) + "/#/dynos/private/" + dyno_id;
  }
}