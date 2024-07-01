import {  Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

const LoadingNewIssue = () => {
  return (
    <Box className='max-w-lg'>
      
        <Skeleton/>
        <Skeleton height='20rem'></Skeleton>      
    </Box>
  )
}

export default LoadingNewIssue
