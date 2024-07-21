import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import React from "react";
import StatusBadge from "../../components/StatusBadge";
import IssueAction from "./IssueAction";
import Link from "../../components/Link";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Metadata } from "next/types";

interface Props {
  searchParams: IssueQuery;
}
// props coming to the page is the params
const Issuepage = async ({ searchParams }: Props) => {
  const statuses = ["ALL", "OPEN", "CLOSED", "IN_PROGRESS"];
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined; // to check whether the params is in the array if wrong params is sent like XALL it will be undefined so filter will be undone and every issue will be shown

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10; //pageSize determines the number of records to display on each page.
  let issues, issueCount;
  if (status != "ALL") {
    issues = await prisma.issue.findMany({
      where: {
        status: status as Status,
      },
      orderBy,
      skip: (page - 1) * pageSize, //skip is used to determine the number of records to skip before starting to collect the result set, (2-1) * 10 = 10. This means the query will skip the first 10 records and return the next 10 records (from the 11th to the 20th).
      take: pageSize, //take is used to determine the number of records to fetch from the database.
    });
    issueCount = await prisma.issue.count({
      where: {
        status: status as Status,
      },
    });
  } else {
    issues = await prisma.issue.findMany({
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    issueCount = await prisma.issue.count({});
  }

  return (
    <Flex direction="column" gap="3">
      <IssueAction />
      <IssueTable searchParams={searchParams} issues={issues} />

      <Pagination
        pageSize={pageSize}
        itemsCount={issueCount}
        currentPage={page}
      />
    </Flex>
  );
};
export const dynamic = "force-dynamic";
export default Issuepage;

export const metadata: Metadata = {
  title: 'IssueTracker Issues',
  description: 'View all Issues',
};
