"use server";

import { revalidatePath } from "next/cache";

import { auth, signIn, signOut } from "./auth";
import { getBookings, updateGuest } from "./data-service";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

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

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("Booking does not belong to the authenticated user");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  // console.log(formData);

  //* 1. AUTHENTICATION & AUTHORIZATION CHECKS
  const bookingId = Number(formData.get("bookingId"));

  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("Booking does not belong to the authenticated user");

  //* 2. INPUT VALIDATION & SANITIZATION

  const updatedFields = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000), // Limit observations to 1000 characters
  };

  // console.log(updatedFields);

  //* 3. UPDATE THE BOOKING
  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}
