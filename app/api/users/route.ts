
import { prisma } from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const pageSize = 10;
        const currentPage = parseInt(searchParams.get('page') as string) || 1;

        const skip = (currentPage - 1) * pageSize;

        const users = await prisma.user.findMany({
            skip,
            take: pageSize,
        });

        const totalUsers = await prisma.user.count();
        const totalPages = Math.ceil(totalUsers / pageSize);

        const paginationInfo = {
            currentPage,
            totalPages,
            totalUsers,
        };

        return  NextResponse.json({ users, pagination: paginationInfo }, {
            status: 200,
            // headers: { referer: referer },
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, {
            status: 500,
            // headers: { referer: referer },
        })
    }

}