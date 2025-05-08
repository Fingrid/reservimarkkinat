import { signIn } from "next-auth/react";
import { Callout } from "@/_mdx-components/Callout";

const linkClasses =
  "underline hover:no-underline hover:text-[var(--color-primary-hover)] hover:dark:text-[var(--color-dark-primary-hover)]";
export const AuthWarning = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Callout type="important" className="w-full">
        <h4 className="pb-2">
          Reservemarket Test Tool is only available for signed-in users.
        </h4>
        <p className="text-sm mt-1">
          To use the tool, please please{" "}
          <a className={linkClasses} href="#">
            register an account.
          </a>
        </p>
      </Callout>
      <p className="text-sm mt-1 italic">
        If you already have an account, please{" "}
        <a className={linkClasses} href="#" onClick={() => signIn()}>
          sign in to your account.
        </a>
      </p>
    </div>
  );
};
