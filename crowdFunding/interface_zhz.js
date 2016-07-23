var web3 = require('config/web3').get();
var fs = require('fs');

// remove legacy service and use service-initBalance now
//TODO 这里的papercode地址可以换
var pathPrefix = 'papercode/contracts-initBalance/';

//载入代码文件
var crowdFudingSystemBin= fs.readFileSync(pathPrefix +'CrowdFundingSystem.bin','utf-8');

//载入ABI文件
var crowdFudingSystemABIStr = fs.readFileSync(pathPrefix +'CrowdFundingSystem.abi','utf-8');
var crowdFudingSystemABI=JSON.parse(crowdFudingSystemABIStr);

//从ABI构建Contract类型
var crowdFudingSystemContract = web3.eth.contract(crowdFudingSystemABI);

var initializer = {
    from: web3.eth.accounts[0],
    data: crowdFudingSystemBin,
    gas: 9990000
};

/**
 * 初始化配置
 * @param callback
 * @returns {*}
 */
function init(callback){
    var crowdFundingSystemInstance = crowdFudingSystemContract.new(initializer, callback);
    return crowdFundingSystemInstance;
}

/**
 * 列出所有实例列表
 * TODO 这个有待重新写
 */
function listEntities(CrowdFundingSystem){
    var entityAddresses = CrowdFundingSystem.getEntityAddrs();
    var entities = [];
    entityAddresses.forEach(function(entityAddress){
        var entityInstance = EntityContract.at(entityAddress);
        var entityQueryInfo = entityInstance.query();
        entities.push({
            entityType: entityQueryInfo[0],
            socialCreditId: web3.toAscii(entityQueryInfo[2]),
            operator: entityQueryInfo[3],
            settlementAddress: entityQueryInfo[4],
            initBalance: CrowdFundingSystem.getInitBalance(entityQueryInfo[3]),
            balance: CrowdFundingSystem.getBalance(entityQueryInfo[3])
        });
    });
    return entities;
}

/**
 * 发行货币给某一账户
 * @param crowdFundingSystem
 * @param from
 * @param to
 * @param amount
 */
function issue(crowdFundingSystem,from,to,amount) {
    if(from != web3.eth.account[0])
        return;
    crowdFundingSystem.issue(to,amount,{from: web3.eth.accounts[0]});
}

/**
 * TODO 方法有待细细考证
 * @param crowdFundingSystem
 * @param from
 * @param to
 * @param amount
 */
function transfer(crowdFundingSystem, from, to, amount){
    crowdFundingSystem.transfer(to,amount,{from: from});
}


/**
 * 更新User的账户信息
 * @param crowdFundingSystem
 * @param users
 * @returns Users
 */
function updateBalance(crowdFundingSystem,users){
    var Users = users;
    Users.forEach(function(user){
        user.balance=crowdFundingSystem.getBalance(user.account);
    });
    return Users;
}

/**
 * 获得用户的代币信息
 * @param crowdFundingSystem
 * @param userAddress
 * @returns int
 */
function getBalance(crowdFundingSystem,userAddress){
    return crowdFundingSystem.getBalance(userAddress);
}

/**
 * 更新Project的账户信息
 * @param crowdFundingSystem
 * @param projects
 * @returns Projects
 */
function updateProjectBalance(crowdFundingSystem,projects){
    var Projects = projects;
    Projects.forEach(function(project){
        project.balance=crowdFundingSystem.getProjectBalance(project.hashID);
    });
    return Projects;
}

/**
 * 获得众筹项目筹集到的代币信息
 * @param crowdFundingSystem
 * @param projectHashID
 * @returns int
 */
function getProjectBalance(crowdFundingSystem,projectHashID){
    return crowdFundingSystem.getProjectBalance(projectHashID);
}

/**
 * 对外暴露的接口
 * @type {{init: init, listEntities: listEntities, transfer: transfer, updateBalance: updateBalance, updateProjectBalance: updateProjectBalance}}
 */
module.exports = {
    init: init,
    issue: issue,
    //listEntities: listEntities,
    transfer: transfer,
    updateBalance : updateBalance,
    getBalance : getBalance,
    updateProjectBalance : updateProjectBalance,
    getProjectBalance : getProjectBalance
}