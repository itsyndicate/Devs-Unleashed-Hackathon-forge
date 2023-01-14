// import {parseNearAmount} from "near-api-js/lib/utils/format";
// import {getNftContract, getObjects} from "./near";
//
// const GAS = "200000000000000";
//
// export const handleMint = async (receiver_id, media, validMedia, title, metadata_extra) => {
//   if (!media.length || !validMedia) {
//     alert('Please enter a valid Image Link. You should see a preview below!');
//     return;
//   }
//
//   const metadata = {
//     title,
//     media,
//     issued_at: Date.now(),
//     extra: JSON.stringify(metadata_extra),
//   };
//
//   const deposit = parseNearAmount('0.1');
//
//   let contract, wallet;
//   await getObjects().then(r => {
//     const {wallet: _wallet} = r;
//     wallet = _wallet;
//     contract = getNftContract(_wallet);
//   });
//
//   console.log(contract);
//
//   await contract.nft_mint({
//     token_id: 'token-' + Date.now(),
//     receiver_id,
//     metadata,
//   }, GAS, deposit);
// };
