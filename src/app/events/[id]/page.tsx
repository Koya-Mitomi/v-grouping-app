'use server';

import { findEventById } from "@/actions/eventActions/findEvents";
import { findPlayersByTeamId } from "@/actions/playerActions/findPlayers";
import { findTeamsByEventId } from "@/actions/teamActions/findTeams";
import { BackButton } from "@/components/common/backButton";
import { DeleteTeamButton } from "@/components/buttons/deleteTeamButton";
import { EventTitle } from "@/components/events/eventTitle";
import { NotificationHandler } from "@/components/common/notificationHandler";
import { TeamView } from "@/components/teams/teamView";
import { Team } from "@/types/team";

type DisplayEventProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ page?: string; limit?: string }>;
};

export const DisplayEvent = async ({ params, searchParams }: DisplayEventProps) => {
  const resolvedParams = await params;
  const eventId = parseInt(resolvedParams.id);
  const event = await findEventById(eventId);
  const teams: Team[] = await findTeamsByEventId(eventId);
  const url: string = `/events/${eventId}`;

  const resolvedSearchParams = (await searchParams) ?? {};
  const page = resolvedSearchParams.page ?? '1';
  const limit = resolvedSearchParams.limit ?? '20';

  const listQuery = `page=${encodeURIComponent(page)}&limit=${encodeURIComponent(limit)}`;
  const urlWithParams: string = `${url}?${listQuery}`;

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
    <div className="flex items-center flex-col gap-4 px-4 py-8 md:p-10">
      <EventTitle eventId={event.id} initialTitle={event.title} />
      <NotificationHandler url={urlWithParams} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-16 w-full max-w-7xl justify-items-center">
        {teamsWithMembers.map(({ team, teamMembers }) => (
          <div key={team.id} className="flex flex-col items-center w-full">
            <TeamView key={team.id} teamName={team.team_name} teamMembers={teamMembers} />
            <div className="flex gap-2 mt-2 justify-center">
              <a href={`${url}/teamDetail?teamName=${encodeURIComponent(team.team_name)}&memberIds=${teamMembers.map(member => member.id).join(',')}&teamId=${team.id}&${listQuery}`} className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer text-sm">
                チーム詳細
              </a>
              <DeleteTeamButton id={team.id} name={team.team_name} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 w-full max-w-xs mt-4">
        <a href={`${url}/teamDetail?${listQuery}`} className="text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          チームを追加
        </a>
        <a
          href={`${url}/createTeams?${listQuery}`}
          className="text-center bg-gradient-to-b from-orange-400 to-orange-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-150 cursor-pointer border-2 border-orange-700"
        >
          チームを自動生成
        </a>
      </div>
      <BackButton path={`/events?page=${encodeURIComponent(page)}&limit=${encodeURIComponent(limit)}`} message="戻る" />
    </div>
  )
}

export default DisplayEvent;
