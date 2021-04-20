const User = require("../Models/user");
const fs = require("fs"); //https://nodejs.dev/learn/the-nodejs-fs-module ==> module for file handling
const formidable = require("formidable"); // formidable is a npm package used to parse form-data, ,we are using it so we can upload picture using form-data. ==> https://www.npmjs.com/package/formidable

// we are making a different apis for picture, because pictures are heavy, so these api response will take tiime to come and get loaded into the front end. That's why we want our normla user data to get first, then we will cal the picture api and let it load. ==> optimization of time (less delay.) ==> an user can see his or other profile within that time, the picture will come to the front end and load.


// testing done
// http://expressjs.com/en/api.html#app.param
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            console.log(`User not found in db\n Error is: ${err}`);
            // return so i don't want to proceed further the api call as an error has already occured.
            return res.status(400).json({
                msg: `${user} not found in db`
            })
        } else {
            console.log(`User found in db`);
            req.userProfileInfo = user; // parsing a new section into the req json obj
            next(); // calling next over here, cause i don't want to proceed the api call further if there's any error occurs in if statement
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
    // TODO: add the process of updating profile picture
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

//_ working fine
exports.uploadProfilePic = (req, res) => {
    const form = formidable({
        keepExtensions: true,
        maxFileSize: 200 * 1024, //200 kb
    });
    form.parse(req, (err, field, file) => {
        if (err) return res.status(400).json(err);
        else {
            const { userProfileInfo } = req;
            userProfileInfo.profilePicture.data = fs.readFileSync(file.photo.path);
            userProfileInfo.profilePicture.contentType = file.photo.type;
            userProfileInfo.save(err => err ? res.status(400).json(err) : res.status(200).send(userProfileInfo));
            console.log(`Field is: ${JSON.stringify(field)}`);
            console.log(`File is: ${JSON.stringify(file)}`);
        }
    });
}
//_ working fine
exports.getProfilePic = (req, res) => req.userProfileInfo.profilePicture ? res.status(200).send(req.userProfileInfo.profilePicture) : res.status(400).json({ err: `${req.userProfileInfo.fullName} do not have any profile pic.` });

//_ working fine
exports.deleteProfilePic = (req, res) => {
    const { userProfileInfo } = req;
    userProfileInfo.profilePicture = undefined; // delete
    userProfileInfo.save(err => err ? res.status(400).json(err) : res.status(200).json(userProfileInfo));
}

//_ working fine
exports.addFollowing = (req, res) => {
    const follower = req.userProfileInfo, personToBeFollwedId = req.body.id;
    let personToBeFollwed = undefined;
    User.findById(personToBeFollwedId, (err, user) => {
        if (err) return res.status(400).json(err);
        else {
            personToBeFollwed = user;
            console.log(`\n\n\npersontobefollowed: ${JSON.stringify(personToBeFollwed)}\n\n\n`);
            const followingArr = follower.followings;
            // if followingArr already contains the id of personToBeFollowed, that means he's already following the person, in that case we don't need to follow him again.
            if (followingArr.find(x => x === personToBeFollwedId))
                return res.status(400).json({
                    msg: `${follower.firstName} is already following ${personToBeFollwed.firstName}`
                });
            else {
                console.log(`hi`);
                console.log(`\n\n\npersontobefollowed: ${JSON.stringify(personToBeFollwed)}\n\n\n`);
                followingArr.push(personToBeFollwedId);
                const followerArr = personToBeFollwed.followers;
                followerArr.push(follower);
                follower.save(err => {
                    if (err)
                        return res.status(400).json(err);
                });
                personToBeFollwed.save(err => {
                    if (err)
                        return res.status(400).json(err);
                });
                return res.status(200).json({
                    msg: `${follower.firstName} is now a follower of ${personToBeFollwed.firstName}`
                });
            }
        }
    });   
}

