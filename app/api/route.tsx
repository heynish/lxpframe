import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { getTokenBalance } from '../core/getTokenBalance'
import { addUser, incrementUserTotalLoads } from '../core/addUser';

// Async function to handle the GET response
async function getResponse(req: NextRequest): Promise<NextResponse> {
  //export async function GET(req: NextRequest) {
  console.time('Total Response Time');
  let accountAddresses: string[] | undefined = [''];

  // Parse the JSON body from the request
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY
  });
  // Handle valid messages
  if (isValid) {
    accountAddresses = message.interactor.verified_accounts;
  }

  try {
    console.log('accountAddresses', accountAddresses);
    if (!accountAddresses || accountAddresses.length === 0) {
      console.log('The array is empty');
      console.timeEnd('Total Response Time');
      return new NextResponse(getFrameHtmlResponse({
        image: {
          src: `${process.env.HOST}/nowallet.png`,
        },
      }));
    } else {
      console.log('The array is not empty');
    }

    //For testing with address having LXP
    const addresses = ['0xfb37feebfc1d441901f57e59a59e77b8e28906ae'];

    // Prepare user data for adding/updating user records
    const userData = {
      address: accountAddresses[0] || "",
      loads: 1,
    };
    // Increment user total loads and add user if new
    let newUser = false;
    const totalLoads = await incrementUserTotalLoads(accountAddresses[0]);
    newUser = totalLoads ? false : await addUser(userData);
    console.log("Database updated");

    const lxpBalance = (
      await Promise.all(
        accountAddresses.map((userAddress: string) => {
          return getTokenBalance(
            userAddress as `0x${string}`
          );
        })
      )
    ).reduce((acc, balance) => acc + BigInt(balance), BigInt(0));

    console.log('lxpBalance', lxpBalance);

    const rankUrl = `${process.env.HOST}/api/balance?balance=${lxpBalance}`;
    console.log('rankUrl', rankUrl);
    console.timeEnd('Total Response Time');
    return new NextResponse(getFrameHtmlResponse({
      buttons: [
        {
          label: 'Learn more about Linea LXP',
          action: 'link',
          target: 'https://linea.build/activations',
        },
      ],
      image: rankUrl,
    })
    );

    if (lxpBalance) {

    } else {

    }

  } catch (error) {
    // Log and return an error response if an exception occurs
    console.timeEnd('Total Response Time');
    console.error('An error occurred:', error);
    return new NextResponse('An error occurred', { status: 500 });
  }

}

// Export the POST function that routes to getResponse
export async function POST(req: NextRequest): Promise<NextResponse> {
  return getResponse(req);
}

// Force-dynamic export to ensure serverless function behavior
export const dynamic = 'force-dynamic';