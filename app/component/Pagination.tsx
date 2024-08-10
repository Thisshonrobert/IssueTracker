'use client'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  itemsCount: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = ({ itemsCount, currentPage, pageSize }: Props) => {
 

  const router = useRouter();
  const searchParams = useSearchParams();
  const totPage = Math.ceil(itemsCount / pageSize);
  if (totPage <= 1) return null;
  const changePage = (page:number)=>{
        const params = new URLSearchParams(searchParams);
        console.log(params)
        
        params.set('page',page.toString());
        router.push('?'+params.toString())
  }

  return (
    <Flex align={"center"} gap="3">
      <Text size="2">
        Page is {currentPage} of {totPage}{" "}
      </Text>
      <Button color="gray" variant="soft" disabled={currentPage === 1} onClick={()=>changePage(1)}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1} onClick={()=>changePage(currentPage - 1)}>
        <ChevronLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === totPage} onClick={()=>changePage(currentPage + 1)}>
        <ChevronRightIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === totPage} onClick={()=>changePage(totPage)}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
