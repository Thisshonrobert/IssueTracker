"use client";
import { IssueSchema } from "@/app/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, Status } from "@prisma/client";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  DropdownMenu,
  Flex,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
type IssueFormData = z.infer<typeof IssueSchema>;

 
const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
    defaultValues: {
      title: issue?.title || "",
      description: issue?.description || "",
      status: issue?.status || "OPEN",
    },
  });
  const [error, setError] = useState("");
  const [issubmitting, setSubmitting] = useState(false);

  const onSubmit = async (data: IssueFormData) => {
    console.log("Submitting form with data:", data);
    setSubmitting(true);
    try {
      if (issue) {
        await axios.patch("/api/issue/" + issue.id, data);
      } else {
        await axios.post("/api/issue", data);
      }
      router.push("/issues/list");
      router.refresh();
      setSubmitting(false);
    } catch (error) {
      setError("An unexpected error has occurred");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-2" color="red">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root placeholder="Title" {...register("title")} />
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Flex justify="between">
          <Button type="submit" disabled={issubmitting}>
            {issue ? "Update Issue" : "Submit New Issue"}
            {issubmitting && <Spinner />}
          </Button>
          {issue && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="soft" color="crimson">
                  Status
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content variant="soft" color="crimson">
                <DropdownMenu.Item
                  color="red"
                  onSelect={() => setValue("status", Status.OPEN)}
                >
                  OPEN
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  color="green"
                  onSelect={() => setValue("status", Status.CLOSED)}
                >
                  CLOSED
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  color="purple"
                  onSelect={() => setValue("status", Status.IN_PROGRESS)}
                >
                  IN_PROGRESS
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        </Flex>
      </form>
    </div>
  );
};

export default IssueForm;
//lazy loading the component bexocz simpleMDE is
// a client side component and in nextjs everything is rendered in server in the initial render so we use lazy loading
//By using zodResolver with react-hook-form, you create a robust, type-safe, and maintainable form validation system that enhances the overall quality of your code.