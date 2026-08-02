"use server";

import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function saveFavoriteTeam(formData) {
  const session = await auth();
  if (!session) redirect("/");

  const apiTeamId = formData.get("apiTeamId");
  const teamName = formData.get("teamName");

  const existing = await prisma.favoriteTeam.findFirst({
    where: { userId: session.user.id, apiTeamId },
  });

  if (!existing) {
    await prisma.favoriteTeam.create({
      data: { apiTeamId, teamName, userId: session.user.id },
    });
  }

  revalidatePath("/teams");
}

export async function removeFavoriteTeam(formData) {
  const session = await auth();
  if (!session) redirect("/");

  const id = formData.get("id");

  await prisma.favoriteTeam.deleteMany({
    where: { id, userId: session.user.id },
  });

  revalidatePath("/favorites");
}