import { IssueSchema } from "@/app/ValidationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export  async function PATCH (req:NextRequest,{params}:{params:{id:string}}){
    const body = await req.json();
    const validate = IssueSchema.safeParse(body)
    if(!validate.success)
        return NextResponse.json(validate.error.format(),{status:400});
    const issue = prisma.issue.findUnique({
        where:{
            id:parseInt(params.id)
        }
    })
    if(!issue)
        return NextResponse.json('Invalid Issue',{status:400});
    
    const updatedIssue = await prisma.issue.update({
        where:{
            id:parseInt(params.id)
        },
        data:{
            title:body.title,
            description:body.description,
            status:body.status
        }
    })    
    return NextResponse.json(updatedIssue,{status:201})
}

export async function DELETE(req:NextRequest,{ params }: { params: { id: string } }) {
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
        {message:"Deleted Successfully"},{status:201}
    );
  } catch (error) {
    return NextResponse.json({error:"Error while deleting"}, { status: 400 });
  }
}
