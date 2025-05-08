import { SessionProvider } from "next-auth/react";
import { auth } from "auth";
import { Validator } from "./_components/Validator";

const classes = {
  container:
    "xml-validator x:mx-auto x:max-w-(--nextra-content-width) p-[3rem]",
  wrapper: "flex flex-col gap-y-[2.5rem]",
  headerSection: "flex flex-col",
  title: "text-2xl font-bold mb-2",
  description: "text-base",
  bottomBorder: "border-t border-gray-300 mt-4 pt-4",
};

export default async function Page() {
  const session = await auth();

  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  return (
    <SessionProvider session={session}>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <Validator />
        </div>
      </div>
    </SessionProvider>
  );
}
