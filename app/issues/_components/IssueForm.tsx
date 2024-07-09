"use client";
import {
  Button,
  Callout,
  TextField,
  Text,
  Spinner,
  DropdownMenu,
  Flex,
} from "@radix-ui/themes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IssueSchema } from "@/app/ValidationSchema";
import { z } from "zod";
import dynamic from "next/dynamic";
import { Issue, Status } from "@prisma/client";

type IssueFormData = z.infer<typeof IssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
}); //lazy loading the component bexocz simpleMDE is
// a client side component and in nextjs everything is rendered in server in the initial render so we use lazy loading

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
      router.push("/issues");
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
