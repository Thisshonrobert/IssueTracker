import dynamic from 'next/dynamic'
import IssueFormSkeleton from '../_components/IssueFormSkeleton'
import { Container } from '@radix-ui/themes'

const IssueForm = dynamic(()=> import('@/app/issues/_components/IssueForm'),
{ ssr:false,
  loading:()=><IssueFormSkeleton/>
}
)

const NewIssuePage = () => {

  return (
    <Container>
    <IssueForm />
    </Container>
  )
}

export default NewIssuePage