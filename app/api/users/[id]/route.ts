
import { prisma } from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server'
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth'

export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {

    const userId = parseInt(id, 10);
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                email: true,
                name: true,
                role: true,
            },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, {
                status: 404,
            });
        }

        return NextResponse.json({ user }, {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, {
            status: 500,
        });
    }
}


export async function PUT(request: NextRequest, { params: { id } }: { params: { id: string } }) {
    // const session = await getServerSession(authOptions)
    // console.log(`**************** put session`,session?.user?.role, session);
    // if(!session || session?.user?.role!=='admin') {
    //     return NextResponse.json({ user: 'Unauthorized' }, {
    //         status: 401,
    //     });
    // }

    const userId = parseInt(id, 10);
    try {
        const formData = await request.json();
        // console.log(`--------PUT updatedData`, formData);

        const existingUser: any = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        // check user is exist 
        if (!existingUser) {
            return NextResponse.json({ message: 'User not found' }, {
                status: 404,
            });
        }

        // check is data modified or not
        const modifiedData: any = {};
        for (const key in formData) {
            if (formData[key] !== existingUser[key]) {
                modifiedData[key] = formData[key];
            }
        }

        // Check users is exist or not 
        if (Object.keys(modifiedData).length === 0) {
            return NextResponse.json({ user: existingUser }, {
                status: 200,
            });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...modifiedData
            }
        });

        return NextResponse.json({ user: { ...updatedUser, password: '' } }, {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, {
            status: 500,
        });
    }
}

export async function DELETE(request: NextRequest, { params: { id } }: { params: { id: string } }) {
    const userId = parseInt(id, 10);
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        // check is usr is exist
        if (!existingUser) {
            return NextResponse.json({ message: 'User not found' }, {
                status: 404,
            });
        }

        const deletedUser = await prisma.user.delete({
            where: {
                id: userId
            },
        });

        return NextResponse.json({ message: 'User deleted successfully' }, {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, {
            status: 500,
        });
    }
}
