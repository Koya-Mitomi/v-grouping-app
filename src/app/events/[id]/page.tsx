'use server';

import { findEventById } from "@/actions/eventActions/findEvents";
import { findPlayersByTeamId } from "@/actions/playerActions/findPlayers";
import { findTeamsByEventId } from "@/actions/teamActions/findTeams";
import { BackButton } from "@/components/backButton";
import { DeleteTeamButton } from "@/components/deleteTeamButton";
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
      <div className="grid grid-cols-2 gap-16 md:grid-cols-3 lg:grid-cols-4 auto-fit">
        {teamsWithMembers.map(({ team, teamMembers }) => (
          <div key={team.id} className="flex flex-col items-center">
            <TeamView key={team.id} teamName={team.team_name} teamMembers={teamMembers} />
            <div className="flex gap-2 mt-2">
              <a href={`${url}/teamDetail?teamName=${encodeURIComponent(team.team_name)}&memberIds=${teamMembers.map(member => member.id).join(',')}&teamId=${team.id}`} className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                チーム詳細
              </a>
              <DeleteTeamButton id={team.id} name={team.team_name} />
            </div>
          </div>
        ))}
      </div>
      <a href={`${url}/teamDetail`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        チームを追加
      </a>
      <BackButton path="/events" message="戻る" />
    </div>
  )
}

export default DisplayEvent;
