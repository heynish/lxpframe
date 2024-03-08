import { createPublicClient, http, formatEther } from "viem";
import { ABIs } from "../lib/abis";
import { linea } from 'viem/chains'

export const getTokenBalance = async (user: `0x${string}`) => {
    const client = createPublicClient({
        chain: linea,
        transport: http(`https://linea-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`),
    });

    const abi = ABIs[("ERC20") as keyof typeof ABIs];
    const args = [user];
    const balance = (await client.readContract({
        address: '0xd83af4fbD77f3AB65C3B1Dc4B38D7e67AEcf599A',
        abi: abi,
        functionName: "balanceOf",
        args,
    })) as number;
    const requiredBalance: number = Number(`${process.env.MIN_TOKEN}`);
    console.log('requiredBalance', requiredBalance);
    const decimals = (await client.readContract({
        abi: abi,
        address: '0xd83af4fbD77f3AB65C3B1Dc4B38D7e67AEcf599A',
        functionName: "decimals",
    })) as number;
    const newbalance = BigInt(balance) / (BigInt(10) ** BigInt(decimals));
    //const newbalance = (balance / BigInt(10) ** BigInt(decimals)).toString().replace(/n$/, '');

    console.log('newbalance', newbalance.toString().replace(/n$/, ''));

    return newbalance;
};