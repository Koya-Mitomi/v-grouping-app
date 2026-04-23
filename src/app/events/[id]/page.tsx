'use server';

import { findEventById } from "@/actions/eventActions/findEvents";
import { findPlayersByTeamId } from "@/actions/playerActions/findPlayers";
import { findTeamsByEventId } from "@/actions/teamActions/findTeams";
import { BackButton } from "@/components/backButton";
import { EventTitle } from "@/components/eventTitle";
import { NotificationHandler } from "@/components/notificationHandler";
import { TeamView } from "@/components/teamView";
import { Team } from "@/types/team";

export const DisplayEvent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const eventId = parseInt(resolvedParams.id);
  const event = await findEventById(eventId);
  const teams: Team[] = await findTeamsByEventId(eventId);
  const url: string = `/events/${eventId}`;

  if (event === null) {
    return <div className="flex items-center flex-col gap-4 p-10">イベントが見つかりませんでした。</div>;
  }

  const teamsWithMembers = await Promise.all(
    teams.map(async (team) => ({
      team,
      teamMembers: await findPlayersByTeamId(team.id)
    }))
  );

  return (
    <div className="flex items-center flex-col gap-4 p-10">
      <EventTitle eventId={event.id} initialTitle={event.title} />
      <NotificationHandler url={url} />
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 auto-fit">
        {teamsWithMembers.map(({ team, teamMembers }) => (
          <TeamView key={team.id} teamName={team.team_name} teamMembers={teamMembers} />
        ))}
      </div>
      <a href={`/events/${event.id}/teamDetail`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        チームを追加
      </a>
      <BackButton path="/events" message="戻る" />
    </div>
  )
}

export default DisplayEvent;
