// "use client";
// import {
//   Button,
//   Callout,
//   TextField,
//   Text,
//   Spinner,
//   Flex,
// } from "@radix-ui/themes";
// import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
// import { useForm, Controller } from "react-hook-form";
// import axios from "axios";
// import "easymde/dist/easymde.min.css";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { IssueSchema } from "@/app/ValidationSchema";
// import { z } from "zod";
// import dynamic from "next/dynamic";

// type IssueFormData = z.infer<typeof IssueSchema>;

// const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//   ssr: false,
// });

// const NewIssuePage = () => {
//   const router = useRouter();
//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<IssueFormData>({
//     resolver: zodResolver(IssueSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       status: "OPEN",
//     },
//   });
//   const [error, setError] = useState("");
//   const [issubmitting, setSubmitting] = useState(false);

//   const onSubmit = async (data: IssueFormData) => {
//     console.log("Submitting form with data:", data);
//     setSubmitting(true);
//     try {
//       await axios.post("/api/issue", data);
//       router.push(`/issues/`);
//       setSubmitting(false);
//       router.refresh();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setError("An unexpected error has occurred");
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-xl">
//       {error && (
//         <Callout.Root className="mb-2" color="red">
//           <Callout.Icon>
//             <ExclamationTriangleIcon />
//           </Callout.Icon>
//           <Callout.Text>{error}</Callout.Text>
//         </Callout.Root>
//       )}
//       <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
//         <TextField.Root placeholder="Title" {...register("title")} />
//         {errors.title && (
//           <Text color="red" as="p">
//             {errors.title?.message}
//           </Text>
//         )}
//         <Controller
//           name="description"
//           control={control}
//           render={({ field }) => (
//             <SimpleMDE placeholder="Description" {...field} />
//           )}
//         />
//         {errors.description && (
//           <Text color="red" as="p">
//             {errors.description?.message}
//           </Text>
//         )}
//         <Flex justify="between">
//           <Button type="submit" disabled={issubmitting}>
//             Submit New Issue
//             {issubmitting && <Spinner />}
//           </Button>
//         </Flex>
//       </form>
//     </div>
//   );
// };

// export default NewIssuePage;
import IssueForm from '../_components/IssueForm'


const NewIssuePage = () => {

  return (
    <IssueForm />
  )
}

export default NewIssuePage