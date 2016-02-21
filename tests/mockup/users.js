const users = {
    admin: {
        username: "admin",
        password: "parola123",
        email: "admin@localhost.ro",
        firstName: "Admin",
        lastName: "Last Name",
        isAdmin: true
    },
    normal: {
        username: "normal",
        password: "parola123",
        email: "normal@localhost.ro",
        firstName: "Normal",
        lastName: "Last Normal",
        isAdmin: false,
        score: 0
    },
    frisco: {
        username: "frisco",
        password: "parola123",
        email: "frisco@localhost.ro",
        firstName: "Frisco",
        lastName: "Last Frisco",
        score: 100
    }
};

module.exports = users;