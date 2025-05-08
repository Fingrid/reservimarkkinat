import { auth, signIn, signOut } from "auth";
import { Avatar } from "./Avatar";
import { User } from "next-auth";

const SignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <button>
        <span className="p-3">Sign in</span>
        <Avatar initials="?" />
      </button>
    </form>
  );
};

const SignOut = ({ user }: { user?: User }) => {
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((name) => name[0])
        .slice(0, 2)
        .join("")
    : undefined;

  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button>
        <Avatar initials={initials} />
      </button>
    </form>
  );
};

export default async function UserButton() {
  const session = await auth();

  if (!session?.user) return <SignIn />;

  return <SignOut user={session.user} />;
}
