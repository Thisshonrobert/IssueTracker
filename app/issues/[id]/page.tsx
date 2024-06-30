import prisma from '@/prisma/client'
import { Card, Flex, Heading } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
 import ReactMarkdown from 'react-markdown'
interface Props {
    params: { id: string }
}

const DetailIssuePage = async ({ params }: Props) => {

    const Issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    }
    )
    if (!Issue)
        notFound()

    return (
        <div>
            <Heading>{Issue.title}</Heading>
            <Flex gap='4' className='my-4'><p>{Issue.status}</p>
                <p>{Issue.createdAt.toDateString()}</p></Flex>

            <Card className='prose'>
                <ReactMarkdown
            >{Issue.description}
            </ReactMarkdown>
            </Card>
        </div>
    )
}

export default DetailIssuePage
