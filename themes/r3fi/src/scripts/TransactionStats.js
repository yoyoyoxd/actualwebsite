/*
    Load transaction stats onto the website.
*/

class TransactionStats {
    contractAddress;
    contractAbi;
    provider;
    web3;
    contract;

    constructor(contractAddress, contractAbi, provider, etherscanApiKey) {
        this.provider = provider;
        this.contractAddress = contractAddress;
        this.contractAbi = contractAbi;
        this.etherscanApiKey = etherscanApiKey;

        this.web3 = this.createW3Instance();
        this.contract = this.createContractInstance();
    }

    createW3Instance() {
        return new Web3(this.provider);
    }

    createContractInstance() {
        return new this.web3.eth.Contract(this.contractAbi, this.contractAddress);
    }

    getTransactionStats(subFromCurrentBlock) {
        return new Promise(resolve => {
            this.web3.eth.getBlockNumber().then(blockNo => {
                const fromBlock = blockNo - subFromCurrentBlock;
                this.contract.getPastEvents("Transfer", {
                    fromBlock: fromBlock
                }).then(function (logs) {
                    let total = 0;

                    for (const log of logs) {
                        // console.debug(log.returnValues.value);
                        total += parseInt(log.returnValues.value);
                    }

                    let fees = total / 100 * 5;
                    resolve({total, fees});
                });
            });
        });
    }

    getTotalWallets() {

    }
}

export default TransactionStats;
