'use server';

import { AddTeamMember } from "@/components/addTeamMember";

export const AddMembers = async ({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const playerIds: number[] = (resolvedSearchParams.memberIds as string)?.split(',').map( str => parseInt(str, 10) ).filter(id => !isNaN(id)) ?? [];
  const teamName: string = (resolvedSearchParams.teamName as string) || '';
  const eventId = parseInt(resolvedParams.id);

  return (
    <AddTeamMember eventId={eventId} teamName={teamName} playerIds={playerIds} />
  )
}

export default AddMembers;