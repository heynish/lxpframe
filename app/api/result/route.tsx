
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
    const { searchParams } = req.nextUrl;
    const page = searchParams.get('link') ?? "https://lineascan.build";
    return NextResponse.redirect(page, { status: 302 });
}

// Export the POST function that routes to getResponse
export async function POST(req: NextRequest): Promise<NextResponse> {
    return getResponse(req);
}

// Force-dynamic export to ensure serverless function behavior
export const dynamic = 'force-dynamic';