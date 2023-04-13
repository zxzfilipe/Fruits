// Include jQuery
$(document).ready(function () {
    // Check if MetaMask is installed and has injected the web3 object
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
    } else {
        alert('MetaMask or another web3 provider is required.');
    }

    // Connect wallet button
    $("#connect-button").click(connectWallet);

    async function connectWallet() {
        try {
            // Request access to the user's Ethereum wallet
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected to wallet:', accounts[0]);

            // Fetch and display the user's NFTs
            const nfts = await getUserNFTs(accounts[0]);
            displayNFTs(nfts);
        } catch (error) {
            console.error('Error connecting to wallet:', error);
        }
    }

    const contractABI = /* Your NFT contract ABI */;
    const contractAddress = /* Your NFT contract address */;

    async function getUserNFTs(account) {
        // Create a contract instance
        const nftContract = new web3.eth.Contract(contractABI, contractAddress);

        // Fetch the user's NFTs (assuming your contract has a function called 'getUserNFTs')
        const nfts = await nftContract.methods.getUserNFTs(account).call();

        return nfts;
    }

    function displayNFTs(nfts) {
        const nftGrid = $('#user-nfts .nft-grid');
        nftGrid.empty();

        nfts.forEach(nft => {
            const nftCard = `
                <div class="nft-card">
                    <img src="${nft.image}" alt="NFT Image" class="nft-image">
                    <h3 class="nft-title">${nft.name}</h3>
                    <p class="nft-description">${nft.description}</p>
                </div>
            `;
            nftGrid.append(nftCard);
        });
    }
});
