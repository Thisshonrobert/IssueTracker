import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetials'

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
        <Grid columns={{initial:'1',md:'2'}} gap='5'>
            <Box >
            <IssueDetails issue={Issue} />
            </Box>
            <Box>
            <EditIssueButton issueId={Issue.id} />
            </Box>
            
        </Grid>
    )
}

export default DetailIssuePage
