export const ABIs = {
    ERC721: [
        {
            inputs: [{ internalType: "address", name: "_keyOwner", type: "address" }],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
    ],
    ERC20: [
        {
            inputs: [{ internalType: "address", name: "_keyOwner", type: "address" }],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "decimals",
            outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
    ],
    ERC1155: [
        {
            inputs: [
                { internalType: "address", name: "_keyOwner", type: "address" },
                {
                    internalType: "uint256",
                    name: "token",
                    type: "uint256",
                },
            ],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
    ],
    MintABI: [
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "netRecipient",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "initialRecipient",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "initialRecipientAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "quantity",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "nonce",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "expiry",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "currency",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct MintVoucherVerification.MintVoucher",
                    "name": "voucher",
                    "type": "tuple"
                },
                {
                    "internalType": "bytes",
                    "name": "signature",
                    "type": "bytes"
                }
            ],
            "name": "mintWithVoucher",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "voucherNonce",
                    "type": "uint256"
                }
            ],
            "name": "cancelVoucher",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
};
