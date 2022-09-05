const sessionizeUser = user => {
    return { userId: user.id, username: user.username, email: user.email };
};

module.exports = { sessionizeUser };
