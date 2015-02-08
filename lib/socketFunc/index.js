/* functions used in the app's socket connection */

var findClientsSocket = function(io, roomId, namespace) {
    var res = []
    , ns = io.of(namespace ||"/");    // the default namespace is "/"

    if (ns) {
        for (var id in ns.connected) {
            if(roomId) {
                var index = ns.connected[id].rooms.indexOf(roomId) ;
                if(index !== -1) {
                    res.push(ns.connected[id]);
                }
            } else {
                res.push(ns.connected[id]);
            }
        }
    }
    return res;
}

var sess_saving = function(io, socket, sessionSockets, messageType, session) {
    findClientsSocket(io).forEach(function (socket) {
        // so far we have access only to client sockets 
        sessionSockets.getSession(socket, function (err, session) {
            // getSession gives you an error object or the session for a given socket 
            session.msgList.push(messageType);
            session.save();
        });
    });
}

exports.sess_saving = sess_saving;