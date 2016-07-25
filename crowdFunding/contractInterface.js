//请求web3服务
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var abi = [{"constant":false,"inputs":[{"name":"to","type":"uint256"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userBalanceMap","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"userAddress","type":"address"}],"name":"addUser","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"projectHash","type":"uint256"}],"name":"getProjectBalance","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"projectHash","type":"uint256"}],"name":"createProject","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Transfer","type":"event"}];
var myContract = web3.eth.contract(abi);
var contractAddress = '0xe47fdd5bceb01cc0f65d5f9f1f838a97b7d33b05';
var crowdFundingSystem = myContract.at(contractAddress);

// //智能合约编译
// var crowdFundSource = 'contract CrowdFundingSystem {     address issuer;     mapping(uint => uint) projectBalanceMap;     mapping(uint => mapping(address => uint)) projectRecordsMap;     mapping(address => uint) public userBalanceMap;     event Issue(address account, uint amount);     event Transfer(address from,uint to, uint amount);     function CrowdFundingSystem() {         issuer = msg.sender;     }     function issue(address account, uint amount) {         if (msg.sender != issuer) throw;         userBalanceMap[account] += amount;         Issue(account, amount);     }     function transfer(uint to, uint amount) {         if (userBalanceMap[msg.sender] < amount) throw;         userBalanceMap[msg.sender] -= amount;         projectBalanceMap[to] +=amount;         projectRecordsMap[to][msg.sender] += amount;         Transfer(msg.sender, to, amount);     }     function addUser(address userAddress){         userBalanceMap[userAddress] = 10000;     }     function createProject(uint projectHash)     {         projectBalanceMap[projectHash] = 0;     }     function getBalance(address account) constant returns (uint) {         return userBalanceMap[account];     }     function getProjectBalance(uint projectHash) constant returns (uint) {         return projectBalanceMap[projectHash];     } }';
// var crowdFundCompiled = web3.eth.compile.solidity(crowdFundSource);
// var crowdFundABI = crowdFundCompiled.CrowdFundingSystem.info.abiDefinition;
// var crowdFundBIN = crowdFundCompiled.CrowdFundingSystem.code;
// //从ABI构建合约contract
// var contract = web3.eth.contract(crowdFundABI);

// var initializer = {
// 	from:web3.eth.accounts[0],
// 	data:crowdFundBIN,
// 	gas:500000
// };
//
// /**
//  *
//  * @param callback
//  * @returns {Contract|*}
//  */
// function init(callback){
//     var crowdFundingSystemInstance = crowdFudingSystemContract.new(initializer, callback);
//     var users = web3.eth.accounts;
//     //初始化每个用户的余额
//     users.forEach(function(user){
//         crowdFundingSystemInstance.issue.sendTransaction(user,10000);
//         }
//     );
//     return crowdFundingSystemInstance;
// }

/**
 * administrator transfer token to users
 * @param from
 * @param to
 * @param amount
 * @param callback
 */
function issue(from,to,amount,callback) {
    if(from != web3.eth.accounts[0])
        return;
    //利用sendTransaction把交易记录到区块链
    crowdFundingSystem.issue.sendTransaction(to,amount,{from: web3.eth.accounts[0]},callback);
}

/**
 * users invest money to a project
 * @param from users' address
 * @param to projectHash
 * @param amount money
 * @param callback function
 */
function transfer(from, to, amount, callback){
    crowdFundingSystem.transfer.sendTransaction(to,amount,{from: from},callback);
}

/**
 * get users balance
 * @param userAddress
 * @returns {*|int}
 */
function getBalance(userAddress){
    return crowdFundingSystem.getBalance(userAddress);
}

/**
 * get amount project has raised
 * @param projectHashID
 * @returns {*|int}
 */
function getProjectBalance(projectHashID){
    return crowdFundingSystem.getProjectBalance(projectHashID);
}

/**
 * 更新User的账户信息
 * @param users
 * @returns Users
 */
function updateBalance(users){
    var Users = users;
    Users.forEach(function(user){
        user.balance=crowdFundingSystem.getBalance(user.account);
    });
    return Users;
}

/**
 * 更新Project的账户信息
 * @param projects
 * @returns Projects
 */
function updateProjectBalance(projects){
    var Projects = projects;
    Projects.forEach(function(project){
        project.balance=crowdFundingSystem.getProjectBalance(project.hashID);
    });
    return Projects;
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
};




