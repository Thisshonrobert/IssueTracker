import { z } from "zod";

export const IssueSchema = z.object({
    title: z.string().min(1, 'title required').max(255),
    description: z.string().min(1, 'description required').max(65000),
    status:z.enum(["OPEN", "CLOSED", "IN_PROGRESS"]),
});

export const patchIssueSchema = z.object({
    title: z.string().min(1, 'title required').max(255).optional(),
    description: z.string().min(1, 'description required').max(65000).optional(),
    status:z.enum(["OPEN", "CLOSED", "IN_PROGRESS"]).optional(),
    assignedToUserId:z.string().optional().nullable()
});
