const Web3 = require('web3');
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // BSC Testnet URL

// Contract details
const contractAddress = '0x0000000000000000000000000000000000000000'; // Example contract address
const abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"name": "", "type": "uint256"}],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {"name": "_to", "type": "address"},
            {"name": "_amount", "type": "uint256"}
        ],
        "name": "mint",
        "outputs": [],
        "type": "function"
    }
];

// Create contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

async function getTotalSupply() {
    const totalSupply = await contract.methods.totalSupply().call();
    console.log(`Total Supply: ${totalSupply}`);
    return totalSupply;
}

async function mint(toAddress, amount) {
    // Replace 'fromAddress' with your BSC Testnet address
    const fromAddress = 'YOUR_ADDRESS_HERE';
    // You need to unlock the account or use a private key for transactions
    // For simplicity, this example assumes the account is unlocked
    const receipt = await contract.methods.mint(toAddress, amount).send({from: fromAddress});
    console.log(`Mint transaction hash: ${receipt.transactionHash}`);
}

async function main() {
    console.log("Current total supply:");
    await getTotalSupply();
    
    const mintToAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"; // Example address
    const mintAmount = 1000; // Example mint amount
    console.log(`Minting ${mintAmount} tokens to ${mintToAddress}`);
    await mint(mintToAddress, mintAmount);
    
    console.log("Updated total supply:");
    await getTotalSupply();
}

main().catch(console.error);