'use server';
import { TeamForm } from '@/components/teamForm';

export const AddTeam = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const eventId = parseInt(resolvedParams.id);
  return (
    <TeamForm eventId={eventId} />
  )
}

export default AddTeam;
