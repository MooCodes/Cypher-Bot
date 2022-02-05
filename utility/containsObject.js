exports.containsObject = function(userID, q) {
    let i;
    for (i = 0; i < q.length; i++) {
        if (q[i].id === userID) {
            return true;
        }
    }

    return false;
}