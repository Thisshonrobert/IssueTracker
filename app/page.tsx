import prisma from "@/prisma/client";
import LatestIssues from "./LatestIssue";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import { Grid, Flex } from "@radix-ui/themes";
import { Metadata } from "next/types";

export default async function Home({searchParams}:{searchParams:{page:string}}) {
  const open = await prisma.issue.count({
    where: { status: 'OPEN' },
  });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED' },
  });

  return(
    <Grid gap='5' columns={{initial:'1', md:'2'}}>
      <Flex direction='column' gap='5'>
      <IssueSummary open={open} inProgress={inProgress} closed={closed}/>
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues/>
    </Grid>
  )
  
}

export const metadata: Metadata = {
  title: 'IssueTracker Dashboard',
  description: 'View the Summary of Issues',
};