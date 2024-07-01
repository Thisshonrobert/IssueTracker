import { Heading, Flex, Card, Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const LoadingDetailIsssue = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton width='5rem'/>
            <Flex gap='4' className='my-4' width='5rem'><p><Skeleton/></p>
                <p><Skeleton width='8rem'/></p></Flex>

            <Card className='prose' mt='4'>
                <Skeleton  count={3}/>
            </Card>
    </Box>
  )
}

export default LoadingDetailIsssue
