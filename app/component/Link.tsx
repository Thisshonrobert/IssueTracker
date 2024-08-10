// radix UI Link component gives styles{css} to link but it make a full page reload instead of client side routing so u create this custom link  
import React from 'react'
import  NextLink from "next/link";
import {Link as RadixLink} from "@radix-ui/themes"

interface Props {
    href:string,
    children:string
}
const Link = ({href,children}:Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}

export default Link
