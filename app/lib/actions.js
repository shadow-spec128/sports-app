"use server";

import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export async function saveFavoriteTeam(formData) {
  const session = await auth();

  if (!session) {
    redirect("/"); // not logged in — send them to sign in first
  }

  const apiTeamId = formData.get("apiTeamId");
  const teamName = formData.get("teamName");

  await prisma.favoriteTeam.create({
    data: {
      apiTeamId,
      teamName,
      userId: session.user.id,
    },
  });
}