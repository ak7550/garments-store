// http://expressjs.com/en/api.html#app.param
const Category = require("../models/category");
exports.getCategoryById = (req, res, next, id) => {
    console.log(`FUCKED UP`);
    Category.findById(id).exec((err, cate) => {
        if (err) {
            console.log("I am executing");
            res.status(400).json({
                error: "Category is not found in db",
                err
            });
        }
        req.category = cate; // I have added a new object in my req json
        next();
    });
}
// https://mongoosejs.com/docs/api/query.html#query_Query-find
// [filter]«Object | ObjectId» mongodb selector.If not specified, returns all documents. (docs)
exports.getAllCategories = (req, res) => {
    console.log("reached into the method");
    Category.find((err, allCate) => {
        console.log(`reached till here. \n Error is: ${JSON.stringify(err)}`);
        if (err) {
            return res.status(400).json({
                err,
                error: "No categories found"
            });
        }
        return res.status(200).json(allCate);
    });
}
exports.getCategory = (req, res) => res.status(200).json(req.category);

exports.createCategory = (req, res) => {
    Category.findOne({ name: req.body.name }, (err, cate) => {
        if (err) return res.status(400).json({
            msg: `Error occured!!`
        });
        else if (cate) return res.status(400).json({
            msg: `${req.body.name} already exists into the database.`
        });
    });
    const cate = new Category(req.body);
    cate.save(err => {
        if (err) return res.status(400).json({
            msg: `Error occured!!`
        });
        else return res.status(200).json({
            cate,
            msg: `is saved into the database successfully.`
        });
    });
}
exports.updateCategory = (req, res) => {
    Category.findByIdAndUpdate(req.category._id, {
        // what are the new values, you wanna set/update
        $set: req.body, // stores the new information that needs to update
    }, // update info ==> scroll down a bit
        {
            new: true, //If you set new: true, findOneAndUpdate() will instead give you the object after update was applied (docs)
            overwrite: false, //  This prevents you from accidentally overwriting the document By default ==> false (docs) ....A bit confusing
        }, (err, cate) => {
            if (err) return res.status(400).json({ msg: `Error! No update was possible` });
            else return res.status(200).json({
                cate,
                msg: `is new updated category`
            })
        });
}
exports.deleteCategory = (req, res) => {
    Category.findByIdAndDelete(req.category._id, err => {
        if (err) return res.status(400).json({
            msg: `${req.category.name} is not deleted from the database`
        }); else return res.status(200).json({
            msg: `${req.category.name} is deleted from the databse.`
        });
    });
}
exports.getProductsFromSameCategory = (req, res) => {
    
}
