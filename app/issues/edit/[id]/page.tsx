import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueFormSkeleton from './loading'
import dynamic from 'next/dynamic'
import { cache } from 'react'
import { Container } from '@radix-ui/themes'

// instead of dynamically lazyloading simpleMDE component as it is a client component , inorder to show the entire page evenly we make the entire component to dynamically load 
const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
)

interface Props {
  params: { id: string }
}
const fetchIssue = cache((Id: number) => prisma.issue.findUnique({
  where: {
    id: Id
  }
}))
const EditIssuePage = async ({ params }: Props) => {
  const issue = await fetchIssue(parseInt(params.id))

  if (!issue) notFound()
  return (
    <Container>   
       <IssueForm issue={issue} />
    </Container>
  )
}

export default EditIssuePage
export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id))
  return {
    title: 'Edit Issue no.' + issue?.id,
    description: 'Edit the Issue no.' + issue?.id,
  };
}

