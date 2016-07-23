contract crowdFunding{
    //3种角色
    //代币发行者
    address issuer;
    //投资者
    struct Funder {
        address addr;
        uint amount;
    }
    //项目
    struct Project {
        address beneficiary; //项目收益人
        uint fundingGoal; //筹资目标
        uint numFunders; //投资人数
        uint amount; //筹得资金
        mapping (uint => Funder) funders; //投资者和项目投资关系map，用投资人数映射
    }
    //项目计数
    uint numProjects;
    //维护项目投资状态的mapping,uint是项目的hash值
    mapping (uint => Project) projects;
    //维持用户账户余额的mapping
    mapping (address => uint) userBalances;
    
    event Issue(address account, uint amount);
    event Contribute(address from, uint to, uint amount);
    
    //构造函数
    function crowdFunding(){
        issuer = msg.sender;
    }
    
    //发行代币,使得用户有金额投资
    function issue(address account, uint amount){
        if(msg.sender != issuer) throw;
        userBalances[account] += amount;
    }
    
    //查询用户余额
    function getBalance(address account) constant returns(uint userBalance){
        return userBalances[account];
    }
    
    //新建一个众筹项目
    function newProject(uint projectHash, address beneficiary, uint goal) {
        if(msg.sender != issuer) throw;
        numProjects = numProjects++; // campaignID is return variable
        // Creates new struct and saves in storage. We leave out the mapping type.
        projects[projectHash] = Project(beneficiary, goal, 0, 0);
    }
    
    //用户投资一个众筹项目
    function contribute(uint projectHash, uint amount) {
        Project project = projects[projectHash];
        // Creates a new temporary memory struct, initialised with the given values
        // and copies it over to storage.
        // Note that you can also use Funder(msg.sender, msg.value) to initialise.
        //向众筹项目中写进投资者地址以及投资金额,投资人数加一
        project.funders[project.numFunders++] = Funder(msg.sender, amount);
        //增加筹得金额
        project.amount += amount;
        //减少投资者余额
        userBalances[msg.sender] -= amount;
        Contribute(msg.sender, projectHash, amount);
    }
    
    //查询众筹项目筹得资金
    function getProjectBalance(uint projectHash) returns(uint projectBalance) {
        Project project = projects[projectHash];
        return project.amount;
    }
        
    //查询项目投资者列表
    function getContributeInfo(uint projectHash) returns(address[], uint[]){
        Project project = projects[projectHash];
        uint numFunders = project.numFunders;
        address[] addr ;
        uint[] amount ;
        
        for(uint i=0; i< project.numFunders; i++){
            //得到项目投资人结构
            Funder funder = project.funders[i];
            addr.push(funder.addr);
            amount.push(funder.amount);
        }
        return (addr,amount);
        
    }
    
}