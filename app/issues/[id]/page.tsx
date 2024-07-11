import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetials'
import DeleteIssueButton from './DeleteIssueButton'
import { auth } from '@/auth'

interface Props {
    params: { id: string }
}

const DetailIssuePage = async ({ params }: Props) => {
    const session = await auth();
    const Issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    }
    )
    if (!Issue)
        notFound()

    return (
        <Grid columns={{initial:'1',sm:'5'}} gap='5'>
            <Box className='md:col-span-4'>
            <IssueDetails issue={Issue} />
            </Box>
            {session && <Flex direction='column' gap='4'> 
            <EditIssueButton issueId={Issue.id} />
            <DeleteIssueButton issueId={Issue.id}></DeleteIssueButton>
            </Flex>  }
        </Grid>
    )
}

export default DetailIssuePage
