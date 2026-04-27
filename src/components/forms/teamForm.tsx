'use server';
import { Player } from '@/types/player';
import { submitTeam } from '@/actions/teamActions/submitTeam';
import { TeamName } from '../teams/teamName';
import { SubmitButton } from '../buttons/submitButton';

export const TeamForm = async (props: { eventId: number; defaultValues: { teamName: string; teamMembers: Player[] }; teamId: number | null; page: string; limit: string }) => {
  const { eventId, defaultValues, teamId, page, limit } = props;
  const memberIds = defaultValues.teamMembers.map(member => member.id).join(',');

  // 保存後に「一覧のpage/limit」を維持して戻すため、server actionにpage/limitを事前バインドしておく
  const submitTeamWithParams = submitTeam.bind(null, page, limit);

  return (
    <div className="w-full max-w-4xl">
      <div className="px-0 py-4 md:p-10 flex flex-col items-center gap-4">
        <form action={submitTeamWithParams} className="w-full px-0 py-4 md:p-10 flex flex-col items-center gap-6">
          <TeamName initialTeamName={defaultValues.teamName} eventId={eventId} memberIds={memberIds.split(',').map(str => parseInt(str, 10))} teamId={teamId} page={page} limit={limit} />
          <input type="hidden" name='eventId' value={eventId} />
          {/* server action側でメンバー更新に使うため、選択中のmemberIdsはhiddenで送る */}
          <input type="hidden" name="memberIds" value={memberIds} />
          {teamId !== null && (
            <input type="hidden" name="teamId" value={teamId} />
          )}
          <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th colSpan={5} className="px-6 py-4 text-sm text-center font-semibold text-gray-600">チームメンバー一覧</th>
                </tr>
                <tr className="bg-gray-50/50">
                  <th className="px-4 py-3 text-sm text-center font-semibold text-gray-600">名前</th>
                  <th className="px-4 py-3 text-sm text-center font-semibold text-gray-600">ポジション</th>
                  <th className="px-4 py-3 text-sm text-center font-semibold text-gray-600">レベル</th>
                  <th className="px-4 py-3 text-sm text-center font-semibold text-gray-600">学年</th>
                  <th className="px-4 py-3 text-sm text-center font-semibold text-gray-600">性別</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {( defaultValues && defaultValues.teamMembers.length > 0) ? defaultValues.teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-medium">{member.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-600">{member.position}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-600">{member.level}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-600">{member.year}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-600">{member.gender}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-sm text-gray-500 text-center italic">
                    まだチームメンバーが登録されていません。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <SubmitButton label="保存" className="w-full max-w-xs px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed text-center transition-all shadow-md active:scale-95" />
        </form>
      </div>
    </div>
  )
}
