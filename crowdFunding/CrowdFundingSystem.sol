contract CrowdFundingSystem {
    address issuer;
    mapping(uint => uint) projectBalanceMap;
    mapping(uint => mapping(address => uint)) projectRecordsMap;
    mapping(address => uint) public userBalanceMap;
    event Issue(address account, uint amount);
    event Transfer(address from,uint to, uint amount);
    function CrowdFundingSystem() {
        issuer = msg.sender;
    }
    function issue(address account, uint amount) {
        if (msg.sender != issuer) throw;
        userBalanceMap[account] += amount;
        Issue(account, amount);
    }
    function transfer(uint to, uint amount) {
        if (userBalanceMap[msg.sender] < amount) throw;
        userBalanceMap[msg.sender] -= amount;
        projectBalanceMap[to] +=amount;
        projectRecordsMap[to][msg.sender] += amount;
        Transfer(msg.sender, to, amount);
    }
    function addUser(address userAddress){
        userBalanceMap[userAddress] = 10000;
    }
    function createProject(uint projectHash)
    {
        projectBalanceMap[projectHash] = 0;
    }
    function getBalance(address account) constant returns (uint) {
        return userBalanceMap[account];
    }
    function getProjectBalance(uint projectHash) constant returns (uint) {
        return projectBalanceMap[projectHash];
    }
}