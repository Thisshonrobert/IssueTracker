import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueFormSkeleton from './loading'
import dynamic from 'next/dynamic'

// instead of dynamically lazyloading simpleMDE component as it is a client component , inorder to show the entire page evenly we make the entire component to dynamically load 
const IssueForm = dynamic(()=> import('@/app/issues/_components/IssueForm'),
{ ssr:false,
  loading:()=><IssueFormSkeleton/>
}
)

interface Props {
  params:{id:string}
}
const EditIssuePage = async({params}:Props) => {
    const issue = await prisma.issue.findUnique({
        where:{
          id:parseInt(params.id)
        }
      })
    
      if(!issue) notFound()
  return (
    <IssueForm issue={issue}/>
  )
}

export default EditIssuePage
