'use client'; 

import { User } from '@prisma/client';
import { Select, Skeleton } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const Assignee = () => {
  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/user').then(res => res.data.user),
    staleTime: 60 * 1000, //60s
    retry: 3
  });

  if (isLoading) return <Skeleton />;

  if (error) {
    console.error('Error fetching users:', error);
    return null;
  }

  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign...' />
      <Select.Content>
         <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {users?.map(user => (
              <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)
            )}
         </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default Assignee

//prisma cannot be used in client component so we need to build a api to populate users from db
