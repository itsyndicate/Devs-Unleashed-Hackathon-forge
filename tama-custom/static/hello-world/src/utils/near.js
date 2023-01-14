// import {BrowserLocalStorageKeyStore} from "../lib/key_stores";
// import {connect} from "../lib/connect";
// import {WalletConnection} from "../lib/wallet-account";
// import {Contract} from "../lib/contract";
//
// export const nftContractName = "nft-tamagotchi.testnet";
//
// export async function getObjects() {
//   const config = {
//     networkId: "testnet",
//     keyStore: new BrowserLocalStorageKeyStore(),
//     nodeUrl: "https://rpc.testnet.near.org",
//     walletUrl: "https://wallet.testnet.near.org",
//     helperUrl: "https://helper.testnet.near.org",
//     explorerUrl: "https://explorer.testnet.near.org",
//   };
//
//   const near = await connect(config);
//   const wallet = new WalletConnection(near);
//
//   return {near, wallet};
// }
//
// export function getNftContract(wallet) {
//   return new Contract.Contract(
//     wallet.account(),
//     nftContractName,
//     {
//       viewMethods: [],
//       changeMethods: ["nft_mint"],
//     }
//   );
// }