"use server";

import { revalidatePath } from "next/cache";

import { auth, signIn, signOut } from "./auth";
import { updateGuest } from "./data-service";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  // console.log(formData);

  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,15}$/.test(nationalID))
    throw new Error(
      "National ID must be 6-15 characters long and only contain letters and numbers.",
    );

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  // console.log(updateData);

  await updateGuest(session.user.guestId, updateData);

  revalidatePath("/account/profile");
}
