import { auth } from '@/auth'
import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import Assignee from './Assignee'
import DeleteIssueButton from './DeleteIssueButton'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetials'
import { cache } from 'react'

interface Props {
    params: { id: string }
}

const fetchIssue = cache((Id:number)=>prisma.issue.findUnique({
    where:{
        id: Id
    }
})) 

const DetailIssuePage = async ({ params }: Props) => {
    const session = await auth();
    const Issue = await fetchIssue(parseInt(params.id))
    if (!Issue)
        notFound()

    return (
        <Grid columns={{initial:'1',sm:'5'}} gap='5'>
            <Box className='md:col-span-4'>
            <IssueDetails issue={Issue} />
            </Box>
            {session && <Flex direction='column' gap='4'>
            <Assignee issue={Issue}/> 
            <EditIssueButton issueId={Issue.id} />
            <DeleteIssueButton issueId={Issue.id}></DeleteIssueButton>
            </Flex>  }
        </Grid>
    )
}

export default DetailIssuePage

export async function generateMetadata({params}:Props) {
   const issue = await fetchIssue(parseInt(params.id))
   return { title: 'Issue no.'+issue?.id,
   description: 'View the entire Issue no.'+issue?.id,
 };
 }

