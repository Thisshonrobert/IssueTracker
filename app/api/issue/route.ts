import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from "../../ValidationSchema";

export  async function POST (req:NextRequest){
    const body = await req.json();
    const validate = IssueSchema.safeParse(body)
    if(!validate.success)
        return NextResponse.json(validate.error.errors,{status:400});
    const issueCreated = await prisma.issue.create({
        data:{
            title:body.title,
            description:body.description
        }
    })    
    return NextResponse.json({issue:issueCreated},{status:201})
}