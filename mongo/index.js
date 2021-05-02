// mongo/index.js
// 1. 加载模块
const mongoose = require("mongoose");
// Mongoose 做异步操作时，为了向后兼容，Mongoose 4 默认使用mpromise 作为返回值。mpromise已被废弃，推荐使用 ES6风格的 promises库或者ES6原生的Promise库
// ES6原生的Promise库
mongoose.Promise = global.Promise;
// 2. 连接数据库 mongod 服务器端  mongo客户端
//数据库的名称可以是不存在 创建一个test数据库
const db = mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true ,useUnifiedTopology: true });

//如果连接失败会执行error回调
mongoose.connection.on("error", (error) => {
    console.log("数据库连接失败：" + error);
});
//如果连接成功会执行open回调
mongoose.connection.on("open",  () => {
    console.log("数据库连接成功");
});
// 定义一个 schema,描述此集合里有哪些字段，字段是什么类型
// 只有schema中有的属性才能被保存到数据库中


let UserSchema = new mongoose.Schema({
    userName : {type: String},
    passWord : { type: String },
    tags : {type: Array},
    sign : {type: Number},
    list: {type: Array}
});


// 创建模型，可以用它来操作数据库中的person集合，指的是整体

let PersonModel = mongoose.model("person", UserSchema, "user");

// 根据模型创建实体，是指的个体对象


// PersonModel.create(personEntity).then(res => console.log(res));
class Entity {
    constructor () {}

    // 查询所有的数据
    query(type, userName, passWord) {
        if(type === "register"){
            return PersonModel.find({userName}).then(res => res);
        }
        if(type === "login"){
            return PersonModel.find({userName,passWord}).then(res => res);
        }
    }

    // 新增数据
    save(res) {
        return PersonModel.create(res)
    }

    // 删除数据
    remove(res) {
        return PersonModel.remove(res).then(res => console.log(res))
    }

    // 修改数据
    update(conditions, updates) {
        return PersonModel.update(conditions, updates).then(res => console.log(res))
    }

    //获取标签
    getData(userName){
        return PersonModel.findOne({userName})
    }

    updateTags(userName, newTags){
        return PersonModel.updateOne({userName}, {tags: newTags})
    }
    updateList(userName, newList){
        return PersonModel.updateOne({userName}, {list: newList})
    }

    updateSign(userName, newSign){
        return PersonModel.updateOne({userName}, {sign: newSign})
    }


}


module.exports = Entity;