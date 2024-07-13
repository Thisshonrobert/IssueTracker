import { IssueSchema, patchIssueSchema } from "@/app/ValidationSchema";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()

  if (!session) return NextResponse.json({}, { status: 401 })

  const body = await req.json();
  const validate = patchIssueSchema.safeParse(body);

  if (!validate.success)
    return NextResponse.json(validate.error.format(), { status: 400 });

  const {assignedToUserId,title,description,status} = body;
  if(assignedToUserId){
    const existingUser = await prisma.user.findUnique({
      where:{
        id:assignedToUserId
      }
    }); 

    if(!existingUser)
        return NextResponse.json('Invalid User',{status:400})

  }
  const issue = prisma.issue.findUnique({
    where: {
      id: parseInt(params.id)
    }
  })
  if (!issue)
    return NextResponse.json('Invalid Issue', { status: 400 });

  const updatedIssue = await prisma.issue.update({
    where: {
      id: parseInt(params.id)
    },
    data: {
      title,
      description,
      status,
      assignedToUserId
    }
  })
  return NextResponse.json(updatedIssue, { status: 201 })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()

  if (!session) return NextResponse.json({}, { status: 401 })
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue)
    return NextResponse.json('Invalid Issue', { status: 400 });

  try {
    await prisma.issue.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(
      { message: "Deleted Successfully" }, { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error while deleting" }, { status: 400 });
  }
}
