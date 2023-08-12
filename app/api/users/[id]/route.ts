
import { prisma } from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params: { id } }: { params: { id: number } }) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: id
            },
            select: {
                email: true,
                name: true,
                role: true,
            },
        });
        return NextResponse.json({ user }, {
            status: 200,
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, {
            status: 500,
            // headers: { referer: referer },
        })
    }

}