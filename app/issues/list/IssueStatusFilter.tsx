'use client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const IssueStatusFilter = () => {
    const router = useRouter()

    const Statuses:{label:string,value:string}[]=[
        {label:'All',value:'ALL'},
        {label:'Open',value:'OPEN'},
        {label:'In Progres',value:'IN_PROGRESS'},
        {label:'Closed',value:'CLOSED'}

    ]

    const searchParams = useSearchParams();
// the value to onValueChange comes from the value from select.Item
  return (
    // when we select a filter sort params disapper to fix it 
    <Select.Root defaultValue={searchParams.get('status') || ''} // first get the status 
    onValueChange={(status) => { 
      const params = new URLSearchParams(); // create empty params
      if (status) params.append('status', status); // add the status to params 
      if (searchParams.get('orderBy')) 
        params.append('orderBy', searchParams.get('orderBy')!); // the add the orderby to params if present 

      const query = params.size ? '?' + params.toString() : '';
      router.push('/issues/list' + query);
    }
    }>
        <Select.Trigger placeholder='filter by status'></Select.Trigger>
        <Select.Content>
            {Statuses.map((status)=>(
                <Select.Item key={status.value} value={status.value}>{status.label}</Select.Item>
            ))}
        </Select.Content>
      
    </Select.Root>
  )
}

export default IssueStatusFilter
