import { NextRequest, NextResponse } from "next/server";
import satori from "satori";
import sharp from 'sharp';
import { join } from "path";
import * as fs from "fs";

export const dynamic = "force-dynamic";

const regPath = join(process.cwd(), "public/AtypDisplay-Regular.ttf");
let reg = fs.readFileSync(regPath);

const boldPath = join(process.cwd(), "public/AtypDisplay-Semibold.ttf");
let bold = fs.readFileSync(boldPath);

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const balance = searchParams.get('balance') ?? "";

    console.log(balance);

    const svg = await satori(
        <div
            style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                padding: 50,
                lineHeight: 1.2,
                color: "white",
                backgroundImage: `url(${process.env.HOST}/bg.png)`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: 'Atyp',
                    fontSize: 60,
                }}
            >
                Your LXP Balance {balance}
            </div>
        </div>,
        {
            width: 800,
            height: 418,
            fonts: [
                {
                    name: "Atyp",
                    data: reg,
                    weight: 400,
                    style: "normal",
                },
                {
                    name: "Atyp",
                    data: bold,
                    weight: 800,
                    style: "normal",
                },
            ],
        },
    );

    const img = await sharp(Buffer.from(svg))
        .resize(1200)
        .toFormat("png")
        .toBuffer();
    console.log('Image Created');
    return new NextResponse(img, {
        status: 200,
        headers: {
            "Content-Type": "image/png",
            "Cache-Control": "no-store",
        },
    });
}