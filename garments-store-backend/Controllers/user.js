const User = require("../Models/user")

// testing done
// http://expressjs.com/en/api.html#app.param
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            console.log(`User not found in db`);
            // return so i don't want to proceed further the api call as an error has already occured.
            return res.status(400).json({
                msg: `${user} not found in db`
            })
        } else {
            console.log(`User found in db`);
            req.userProfileInfo = user; // parsing a new section into the req json obj
            next(); // calling next over here, cause i don't want to proceed the api call further if there's any error occurs in fi statement
        }
    })
}

// testing done
exports.getUser = (req, res) => {
    // TODO: remove the passwords and other necessry details.
    return res.status(200).json({
        userProfileInfo: req.userProfileInfo,
        msg: `user is sent`
    });
}


// https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
// testing done
exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.userProfileInfo._id,
        {
            // what are the new values, you wanna set/update
            $set: req.body, // stores the new information that needs to update
        }, // update info ==> scroll down a bit
        {
            new: true, //If you set new: true, findOneAndUpdate() will instead give you the object after update was applied (docs)
            overwrite: false, //  This prevents you from accidentally overwriting the document By default ==> false (docs) ....A bit confusing
        }, // options
        (err, user) => {
            if (err) {
                res.status(400).json({
                    error: "Not authorised to update this user"
                })
            }
            // user.salt=undefined; // as it's now a copied data from db, so it's not gonna change into db, but we dont wanna show crucial information
            // user.encryptedPassword=undefined; // as it's now a copied data from db, so it's not gonna change into db, but we dont wanna show crucial information
            // user.createdAt=undefined; // as it's now a copied data from db, so it's not gonna change into db, but we dont wanna show crucial information
            // user.updatedAt=undefined; 
            res.status(200).json({
                user,
                msg: ` is the updated info.`
            });
            console.log(`Changed profile is: ${user}`);
        });
}


// https://mongoosejs.com/docs/api.html#model_Model.findOneAndDelete
// testing done
exports.deleteUser = (req, res) => {
    res.clearCookie("token").status(200).json({
        msg: `user is signedout!!`
    });
    User.findOneAndDelete({ _id: req.userProfileInfo._id }, (err, user) => {
        if (err || !user) {
            console.log(`${JSON.stringify(user)} not found in db`);
            // return so i don't want to proceed further the api call as an error has already occured.
            console.log(`${JSON.stringify(user)} not found in db`);
        } else {
            console.log(`${JSON.stringify(user)} is deleted from db`);
        }
    })
}

// https://mongoosejs.com/docs/api.html#model_Model.deleteMany
//testing done
exports.deleteAllUser = (req, res) => {
    User.deleteMany({
        _id: {
            $ne: req.userProfileInfo._id // remove all users except this one
        },
        role: {
            $ne: 1, // remove all the users except admin 
        }
    }, (err, data) => {
        if (err) {
            console.log(`${err} occured`);
            res.status(400).json({
                err,
                msg: `has been occured`
            })
        } else {
            console.log(`${data} are deleted from db`);
            res.status(200).json({
                data,
                msg: `are deleted`
            })
        }
    });
}

exports.getAllUser = (req, res) => {
    User.find((err, users) => {
        if (err) return res.status(400).json(err);
        else return res.status(200).json(users);
    })
}