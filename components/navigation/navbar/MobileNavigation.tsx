import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ROUTES from "@/constans/routes";

import NavLinks from "./NavLinks";

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image src="/icons/hamburger.svg" width={36} height={36} alt="Menu" className="invert-colors sm:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="background-light900_dark200 border-none px-2 py-3">
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/site-logo.svg" width={23} height={23} alt="Logo" />
          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
            Dev<span className="text-primary-500">Flow</span>
          </p>
        </Link>
        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-6 pt-10">
              <NavLinks isMobileNav />
            </section>
          </SheetClose>
        </div>
        <div className="flex flex-col gap-3">
          <SheetClose asChild>
            <Link href={ROUTES.SIGN_IN}>
              <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3">
                <span className="primary-text-gradient">Log In</span>
              </Button>
            </Link>
          </SheetClose>
        </div>
        <div className="flex flex-col gap-3">
          <SheetClose asChild>
            <Link href={ROUTES.SIGN_UP}>
              <Button className="small-medium btn-tertiary light-border-2 text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                Sign Up
              </Button>
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
