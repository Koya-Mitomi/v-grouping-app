'use server';
import { Player } from '@/types/player';
import { BackButton } from './backButton';
import { submitTeam } from '@/actions/teamActions/submitTeam';

export const TeamForm = async (props: { eventId: number; defaultValues: { teamName: string; teamMembers: Player[] } }) => {
  const { eventId, defaultValues } = props;
  let add_members_url = `/events/${eventId}/addTeam/addMembers?teamName=${defaultValues.teamName}&memberIds=${defaultValues.teamMembers.map(member => member.id).join(',')}`;

  return (
    <div>
      <div className="p-10 flex flex-col items-center gap-4">
        <form action={submitTeam} className="p-10 flex flex-col items-center gap-4">
          <input type="text" name='teamName' placeholder="チーム名を入力" defaultValue={defaultValues.teamName} className="w-fit max-w-full min-w-120 rounded border p-2 text-center" />
          <input type="hidden" name='eventId' value={eventId} />
          <input type="hidden" name="memberIds" value={defaultValues.teamMembers.map(member => member.id).join(',')} />
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th colSpan={7} className="px-6 py-4 text-sm text-center font-semibold text-gray-600">チームメンバー一覧</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm text-center font-semibold text-gray-600">名前</th>
                  <th className="px-6 py-4 text-sm text-center font-semibold text-gray-600">ポジション</th>
                  <th className="px-6 py-4 text-sm text-center font-semibold text-gray-600">レベル</th>
                  <th className="px-6 py-4 text-sm text-center font-semibold text-gray-600">学年</th>
                  <th className="px-6 py-4 text-sm text-center font-semibold text-gray-600">性別</th>
                  <th className="px-6 py-4 text-sm text-center font-semibold text-gray-600">削除</th>
                </tr>
                {( defaultValues && defaultValues.teamMembers.length > 0) ? defaultValues.teamMembers.map((member) => (
                  <tr key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.level}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.gender}</td>
                    <td className="px-6 py-4">
                      <button className="text-red-600 hover:text-red-900 cursor-pointer">削除</button>
                    </td>
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
          <a
            href={add_members_url}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer text-center"
          >
            チームメンバー編集
          </a>
          <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 cursor-pointer text-center">
            保存
          </button>
        </form>
        <BackButton path={`/events/${eventId}`} message="キャンセル" />
      </div>
    </div>
  )
}
