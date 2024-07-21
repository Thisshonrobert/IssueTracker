import IssueChart from "@/app/IssueChart";
import IssueSummary from "@/app/IssueSummary";
import LatestIssues from "@/app/LatestIssue";
import prisma from "@/prisma/client";
import { Grid, Flex } from "@radix-ui/themes";
import { Metadata } from "next/types";

export default async function summary() {
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
    <Grid gap='8' columns={{initial:'1', md:'2'}}>
      <Flex direction='column' gap='8'>
      <IssueSummary open={open} inProgress={inProgress} closed={closed}/>
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues/>
    </Grid>
  )
  
}

export const metadata: Metadata = {
  title: 'IssueTracker Summary',
  description: 'View the Summary of Issues',
};