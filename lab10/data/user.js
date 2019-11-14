const bcrypt = require("bcrypt");
const users = [
    {
        _id: 0,
        username: "masterdetective123",
        firstName: "Sherlock",
        lastName: "Holmes",
        profession: "Detective",
        bio: 'Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a "consulting detective" in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.',
        hashedpassword: "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.",
    },
    {
        _id: 1,
        username: "lemon",
        firstName: "Elizabeth",
        lastName: "Lemon",
        profession: "Writer",
        bio: 'Elizabeth Miervaldis "Liz" Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan.',
        hashedpassword: "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm",
    },
    {
        _id: 2,
        username: "theboywholived",
        firstName: "Harry",
        lastName: "Potter",
        profession: "Student",
        bio: "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles.",
        hashedpassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
    }
];

function getUserByUsername(username) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username) {
            return users[i];
        }
    }
    //not get one
    return false;
}

// function getUserById(id) {
//     for (let i = 0; i < users.length; i++) {
//         if (users[i]._id == id) {
//             return users[i];
//         }
//     }
//     //not get one
//     throw `no user with this id!`;
// }

async function CheckLogin(username, password) {
    try {
        if (!username)
            throw `not provide username`;
        if (!password)
            throw `not provide password`;
        //get the user
        const user = getUserByUsername(username.toLowerCase());
        if (user === false) {
            return `username not found`;
        }
        else {
            var compareToMatch = await bcrypt.compare(password, user.hashedpassword);
            if (compareToMatch == false)
                return `password not correct`;
            else {
                return true;
            }
        }

    } catch (e) {
        throw e;
    }

}

module.exports = {
    CheckLogin, getUserByUsername,
};