// "use client";
// import React, { useEffect, useState } from 'react';
// import { useTheme } from 'next-themes';
// import Image from "next/image";
// import { FaBug } from 'react-icons/fa';
// import Link from 'next/link';

// const ClientComponent = () => {
//   const { theme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const isDarkTheme = theme === "dark";

//   return (
//     <div>
//       <main className="flex min-h-screen flex-col items-center justify-between p-24">
//         <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
//           <p className={`fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 ${isDarkTheme ? '' : ''}`}>
//           Manage and Track Issues Seamlessly
//           </p>
//           <div className="fixed bottom-0 left-0 flex w-full items-end rounded md:rounded-xl justify-center border  border-gray-300 bg-gradient-to-t p-2 from-zinc-200 dark:border-neutral-800 dark:bg-zinc-800/30  lg:static lg:size-auto lg:bg-none ">
//             <a
//               className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//               href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Powered By{" "}
//               <Image
//                 src="/vercel.svg"
//                 alt="Vercel Logo"
//                 className={isDarkTheme ? "dark:invert" : ""}
//                 width={100}
//                 height={28}
//                 priority
//               />
//             </a>
//           </div>
//         </div>

     
//           <div className="flex flex-col items-center mb-6 md:mb-0">
//             <div className="flex items-center">
//               <FaBug size={40} color={isDarkTheme ? "white" : "black"} className="mr-2" />
//               <h2 className="text-4xl font-bold text-center font-playwrite text-glow">
//                 Issue Tracker
//               </h2>
//             </div>
//           </div>
      

//         <div className="mb-28 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-2 lg:text-left">
//           <Link
//             href="/issues/list"
//             className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           >
//             <h2 className="mb-3 text-2xl font-semibold">
//               Issues{" "}
//               <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//                 -&gt;
//               </span>
//             </h2>
//             <p className="m-0 max-w-[30ch] text-sm opacity-50">
//               View and manage all issues.
//             </p>
//           </Link>

//           <Link
//             href="/issues/summary"
//             className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           >
//             <h2 className="mb-3 text-2xl font-semibold">
//               Summary{" "}
//               <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//                 -&gt;
//               </span>
//             </h2>
//             <p className="m-0 max-w-[30ch] text-sm opacity-50">
//               Summary of all issues.
//             </p>
//           </Link>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ClientComponent;

"use client";
import React from "react";
import { SparklesCore } from "./components/ui/sparkles";
import { HoverBorderGradient } from "./components/ui/hover-border-gradient";
import Link from 'next/link';
import { Flex } from "@radix-ui/themes";

export default function ClientComponent() {
  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
      昆虫Tracker
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
 
        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        <Flex justify='between'>
        <Link
             href="/issues/summary"
          >
        <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black  dark:text-white flex items-center space-x-2"
      >
        
        <span>Summary</span>
      </HoverBorderGradient>
      </Link>
      <Link
            href="/issues/list"
          >
        <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black  dark:text-white flex items-center space-x-2"
      >
        
        <span>Issues</span>
      </HoverBorderGradient>
      </Link>
      </Flex>
      </div>
    </div>
  );
}
