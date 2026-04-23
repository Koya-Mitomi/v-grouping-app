'use server';
import { Player } from '@/types/player';
import { BackButton } from './backButton';
import { submitTeam } from '@/actions/teamActions/submitTeam';
import { TeamNameLink } from './teamNameLink';

export const TeamForm = async (props: { eventId: number; defaultValues: { teamName: string; teamMembers: Player[] } }) => {
  const { eventId, defaultValues } = props;
  const memberIds = defaultValues.teamMembers.map(member => member.id).join(',');

  return (
    <div>
      <div className="p-10 flex flex-col items-center gap-4">
        <form action={submitTeam} className="p-10 flex flex-col items-center gap-4">
          <TeamNameLink initialTeamName={defaultValues.teamName} eventId={eventId} memberIds={memberIds.split(',').map(str => parseInt(str, 10))} />
          <input type="hidden" name='eventId' value={eventId} />
          <input type="hidden" name="memberIds" value={memberIds} />
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th colSpan={5} className="px-6 py-4 text-sm text-center font-semibold text-gray-600">チームメンバー一覧</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm text-center font-semibold text-gray-600">名前</th>
                  <th className="px-6 py-4 text-sm text-center font-semibold text-gray-600">ポジション</th>
                  <th className="px-6 py-4 text-sm text-center font-semibold text-gray-600">レベル</th>
                  <th className="px-6 py-4 text-sm text-center font-semibold text-gray-600">学年</th>
                  <th className="px-6 py-4 text-sm text-center font-semibold text-gray-600">性別</th>
                </tr>
                {( defaultValues && defaultValues.teamMembers.length > 0) ? defaultValues.teamMembers.map((member) => (
                  <tr key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.level}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.gender}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-sm text-gray-500 text-center">
                    まだチームメンバーが登録されていません。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 cursor-pointer text-center">
            保存
          </button>
        </form>
      </div>
    </div>
  )
}
