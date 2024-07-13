'use client'; 

import { Issue, User } from '@prisma/client';
import { Select, Skeleton } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast,{Toaster } from 'react-hot-toast'


const Assignee = ({issue}:{issue:Issue}) => {
  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/user').then(res => res.data.user),
    staleTime: 60 * 1000, //60s the user is treated as a new data 
    retry: 3 
  });

  if (isLoading) return <Skeleton />;

  if (error) {
    console.error('Error fetching users:', error);
    return null;
  }
  const assignIssue = (userId:string) => {
    axios.patch("/api/issue/" + issue.id, {
      assignedToUserId: userId==='unassigned'? null:userId
    }).catch(()=>{
      toast.error("Changes cannot be made")
    });
  }

  return (
    <>
    <Toaster/>
    <Select.Root
    defaultValue={issue.assignedToUserId || "unassigned"}
    onValueChange={assignIssue}
  >
    <Select.Trigger placeholder="Assign..." />
    <Select.Content>
      <Select.Group>
        <Select.Label>Suggestions</Select.Label>
        <Select.Item value="unassigned">Unassigned</Select.Item>
        {users?.map((user) => (
          <Select.Item key={user.id} value={user.id}>
            {user.name}
          </Select.Item>
        ))}
      </Select.Group>
    </Select.Content>
  </Select.Root></>
    
  );
};


export default Assignee

//prisma cannot be used in client component so we need to build a api to populate users from db
