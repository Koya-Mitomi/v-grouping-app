"use server";

import { redirect } from "next/navigation";
import { upsertTeam } from "./addTeam";

export async function submitTeam(formData: FormData) {
  const teamName: string = formData.get('teamName') as string;
  const memberIds: number[] = (formData.get('memberIds') as string)?.split(',').map(str => parseInt(str, 10)).filter(id => !isNaN(id)) ?? [];
  const eventId: number = parseInt(formData.get('eventId') as string, 10);
  const teamId: number | null = formData.get('teamId') ? parseInt(formData.get('teamId') as string, 10) : null;
  let message: string = '';

  if (!teamName) {
    redirect(`/events/${eventId}?message=${encodeURIComponent('チーム名は必須です')}`);
  }

  if (await upsertTeam(eventId, teamName, memberIds, teamId)) {
    message = 'チーム情報が更新されました';
  } else {
    message = 'チーム情報の更新に失敗しました';
  }

  redirect(`/events/${eventId}?message=${encodeURIComponent(message)}`);
}
