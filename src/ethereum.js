import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

const contractAddressLIMO = "0x0d464bdde2301c30871bb4c29bb7dd935f5a985c";
// let minABI
const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  // decimals
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
];

const getBlockchain = () =>
  new Promise(async (resolve, reject) => {
    // related to Metamask. Here we got window.ethereum
    let provider = await detectEthereumProvider();
    if (provider) {
      await provider.request({ method: "eth_requestAccounts" });
      const networkId = await provider.request({ method: "net_version" });
      console.log(`networkId: ${networkId}`);
      provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(
        contractAddressLIMO,
        minABI,
        signer
      );
      // returns js object that points to our smart contract on the blockchain
      resolve({ nftContract });
      return;
    }
    reject("Install Metamask");
  });

export default getBlockchain;

//   console.log("Contract info");
//   console.log(nftContract);

//   console.log(`Collection address: ${nftContract.address}`);

//   const collectionName = await nftContract.name();
//   console.log(`Collection name: ${collectionName}`);

//   const collectionSymbol = await nftContract.symbol();
//   console.log(`Collection symbol: ${collectionSymbol}`);

//   const collectionSupply = await nftContract.totalSupply();
//   console.log(
//     `Collection total supply: ${ethers.BigNumber.from(collectionSupply._hex)}`
//   );

//   const bigNumber = await nftContract.balanceOf(randomOwnerFromLIMO);
//   console.log(`balanceOf(): ${ethers.BigNumber.from(bigNumber._hex)}`);

//   const tokenId = await nftContract.tokenOfOwnerByIndex(
//     randomOwnerFromLIMO,
//     ethers.BigNumber.from(25)
//   );
//   console.log(
//     `tokenOfOwnerByIndex(): ${ethers.BigNumber.from(tokenId._hex)}`
//   );

//   const tokenUri = await nftContract.tokenURI(ethers.BigNumber.from(2694));
//   console.log(`tokenUri(): ${tokenUri}`);
