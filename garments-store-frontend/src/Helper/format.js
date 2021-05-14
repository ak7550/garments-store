export const formatProductInfo = (info, sizeArr) => {
    const { cateName, imageLinks, category, description } = info;
    const imageLinkArr = imageLinks.split(",");
    const product = {};
    product.name = cateName;
    product.description = description;
    product.category = category.name;
    product.imageLinks = imageLinkArr;
    const modifiedArr = sizeArr.map((obj, index) => {
        const newObj = {};
        newObj.size = obj.name;
        newObj.price = obj.price;
        newObj.stockCount = obj.quantity;
        return newObj;
    });
    product.sizes = modifiedArr;
    console.log(`finally the product is:`);
    console.log(product);

    return product;
}
export const formatProductUpdateInfo = (info, sizeArr) => {
    const { newName, imageLinks, category, description } = info;
    const imageLinkArr = imageLinks?.split(",");
    const product = {};
    product.name = newName;
    product.description = description;
    product.category = category?._id;
    product.imageLinks = imageLinkArr;
    const modifiedArr = sizeArr?.map((obj, index) => {
        const newObj = {};
        newObj.size = obj.name;
        newObj.price = obj.price;
        newObj.stockCount = obj.quantity;
        return newObj;
    });
    product.sizes = modifiedArr;
    console.log(`finally the product is:`);
    console.log(product);

    return product;
}
