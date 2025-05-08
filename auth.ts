import Credentials from "next-auth/providers/credentials";
import NextAuth, { User } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email) {
          throw new Error("Invalid credentials.");
        }

        return {
          id: "1",
          name: "John Doe",
          email: credentials.email as string,
        } satisfies User;
      },
    }),
  ],
});
