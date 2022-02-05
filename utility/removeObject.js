exports.removeObject = function(userID, q) {
    let i;
    for (i = 0; i < q.length; i++) {
        if (q[i].id === userID) {
            q.splice(i, 1);
            return true;
        }
    }

    return false;
}