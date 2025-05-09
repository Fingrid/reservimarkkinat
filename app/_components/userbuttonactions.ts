"use server";

import { signIn, signOut, auth } from "auth";

// Server actions for sign in and sign out
export const actionSignIn = async() => await signIn();
export const actionSignOut = async() => await signOut();
export const getSession = async() => await auth();
