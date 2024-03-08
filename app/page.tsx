import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import Image from 'next/image';
import Head from 'next/head';


const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'View Your LXP Balance',
    },
  ],

  image: {
    src: `${process.env.HOST}/bg.png`
  },
  post_url: `${process.env.HOST}/api`,
});

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_HOST}`),
  title: 'View Your LXP Balance',
  description: 'View Your LXP Balance',
  openGraph: {
    title: 'View Your LXP Balance',
    description: 'View Your LXP Balance',
    images: `${process.env.HOST}/bg.png`,
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        {/* Add any other meta tags, title, or links needed here */}
      </Head>
      <body>
        {/* Existing content */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative' // Needed for next/image to work properly
        }}>
          <Image
            src='/bg.png'
            alt='Background Image'
            width={1024}  // replace with the actual image width
            height={1024} // replace with the actual image height
            layout='intrinsic'  // This ensures the image maintains its natural width and height
          />
          {/* Additional content */}
        </div>
      </body>
    </>
  )
}
