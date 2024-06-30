'use client';
import { Button, Callout, TextField, Text,Spinner } from '@radix-ui/themes'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { IssueSchema } from '@/app/ValidationSchema';
import { z } from 'zod'

type IssueForm = z.infer<typeof IssueSchema>;


const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(IssueSchema)
  });
  const [error, setError] = useState("")
  const[issubmitting,setSubmitting] = useState(false)

  return (
    <div className='max-w-xl'>
      {error && <Callout.Root className='mb-2' color='red'>
        <Callout.Icon>
          <ExclamationTriangleIcon />
        </Callout.Icon>
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>}
      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          setSubmitting(true)
          try {
            await axios.post('/api/issue', data);
            router.push('/issues');
            setSubmitting(false)
          } catch (error) {
            setError('An unexpected error has occured')
          }

        })}>


        <TextField.Root placeholder='Title' {...register('title')}>
        </TextField.Root>
        {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}
        <Button disabled={issubmitting} >Submit New Issue{issubmitting && <Spinner/>}</Button>
      </form>
    </div>

  )
}

export default NewIssuePage	