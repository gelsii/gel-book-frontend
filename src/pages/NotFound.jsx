import { SearchIcon } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { Link } from "react-router-dom";

export default function NotFound({ message, status }) {
  return (
    <section className="flex justify-center items-center w-screen h-screen bg-[#181818]">
      <Empty>
        <EmptyHeader>
          <EmptyTitle className={'text-white max-w-sm text-4xl'}>
            {status} - {message}
          </EmptyTitle>
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist. Try searching
            for what you need below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <InputGroup className="sm:w-3/4">
            <InputGroupInput placeholder="Try searching for pages..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Kbd>/</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <EmptyDescription>
            Need help? <Link to={''}>Contact Us</Link>
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </section>
  );
}
