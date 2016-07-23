
manage.init(function(error, contract){
	//如果合约部署出错
	if (error) {
		console.log(error + "合约部署失败");
		return;
	}
	//如果合约正在部署，还未产生地址
	if (!contract.address) {
		console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
	}else{
		console.log("Contract mined!");
		return contract.address;
	}
}
);