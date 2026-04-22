'use client';
import { Player } from '@/types/player';
import { useEffect, useState } from 'react';
import { BackButton } from './backButton';
import { AddTeamMember } from './addTeamMember';

export const TeamForm = (props: { eventId: number; defaultValues?: { teamName: string; teamMembers: Player[] } }) => {
  const { eventId, defaultValues } = props;
  let teamInfo: { teamName: string; teamMembers: Player[] } | null = null;
  if (defaultValues) {
    teamInfo = { ...defaultValues };
  }
  const [teamName, setTeamName] = useState(teamInfo?.teamName || '');
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonAble, setIsButtonAble] = useState(true);

  useEffect(() => {
    if (teamInfo) {
      setTeamName(teamInfo.teamName);
    }
    setIsLoading(false);
  }, []);

  const onClickButton = () => {
    setIsButtonAble(false);
  };

  const onClickAdd = (players: Player[]) => {
    teamInfo?.teamMembers.push(...players);
    setIsButtonAble(true);
  };

  const onClickCancel = () => {
    setIsButtonAble(true);
  };

  return (
    <div>
      {isButtonAble ? <div className="p-10 flex flex-col items-center gap-4">
        <input type="text" placeholder="チーム名を入力" value={teamName} onChange={(e) => setTeamName(e.target.value)} className="w-fit max-w-full min-w-120 rounded border p-2 text-center" />
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
              {( teamInfo && teamInfo.teamMembers.length > 0) ? teamInfo.teamMembers.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.level}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{member.gender}</td>
                  <td className="px-6 py-4">
                    <button className="text-red-600 hover:text-red-900">削除</button>
                  </td>
                </tr>
              )) : isLoading ?
              <tr>
                <td colSpan={7} className="px-6 py-4 text-sm text-gray-500 text-center">
                  読み込み中...
                </td>
              </tr>
              : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-sm text-gray-500 text-center">
                  まだチームメンバーが登録されていません。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer text-center"
          onClick={onClickButton}
        >
          チームメンバー追加
        </button>
        <a href="#" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 cursor-pointer text-center">
          保存
        </a>
        <BackButton path={`/events/${eventId}`} message="キャンセル" />
      </div> : <AddTeamMember onClickAdd={onClickAdd} onClickCancel={onClickCancel} />
      }
    </div>
  )
}
