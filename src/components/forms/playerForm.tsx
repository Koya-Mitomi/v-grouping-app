'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PlayerInputs } from '@/types/player';
import { SubmitButton } from '../buttons/submitButton';

const positions: { label: string; value: string }[] = [
  { label: 'セッター（S）', value: 'S' },
  { label: 'レフト（OH）', value: 'OH' },
  { label: 'ライト（OP）', value: 'OP' },
  { label: 'センター（MB）', value: 'MB' },
  { label: 'リベロ（L）', value: 'L' },
  { label: 'なし', value: 'None' },
];

const levels: { label: string; value: number }[] = [
  { label: '1（未経験）', value: 1 },
  { label: '2（初級）', value: 2 },
  { label: '3（中級）', value: 3 },
  { label: '4（上級）', value: 4 },
];

const genders: { label: string; value: string }[] = [
  { label: '男性', value: 'male' },
  { label: '女性', value: 'female' },
];

export const PlayerForm = (props: { formname: string; defaults: PlayerInputs; isLoading: boolean; onSubmit: SubmitHandler<PlayerInputs> }) => {
  const { formname, defaults, isLoading, onSubmit } = props;
  const { register, handleSubmit, formState: { errors } } = useForm<PlayerInputs>({ defaultValues: defaults });
  return (
    <div className="p-4 md:p-10 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">プレイヤーを{formname}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
          <div className='flex flex-col items-center w-full'>
            <div className='flex flex-col items-center w-full m-4'>
              <label htmlFor="name" className='block mb-2 font-bold text-lg' >名前</label>
              <input 
                type="text" 
                placeholder="名前" 
                {...defaults.name && { defaultValue: defaults.name }}
                className="border p-2 rounded w-64" 
                {...register("name", { required: { value: true, message: "名前は必須です" },
                  // 記号を弾き、名前入力で想定外の文字列が入らないようにする
                  pattern: { value: /^[0-9a-zA-Zぁ-んァ-ヶ一-龠々ー]+$/, message: 'その名前は無効です' } })}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className='flex flex-col items-center w-full m-4'>
              <label htmlFor="position" className='block mb-2 font-bold text-lg' >ポジション</label>
              <div className="flex justify-center gap-4">
                {positions.map((pos) => (
                  <label key={pos.label} className="flex items-center">
                    <input
                      type="radio"
                      value={pos.value}
                      defaultChecked={defaults.position === pos.value}
                      {...register("position", { required: { value: true, message: "ポジションは必須です" } })}
                    />
                    <span className="ml-2">{pos.label}</span>
                  </label>
                ))}
              </div>
              {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
            </div>
            <div className='flex flex-col items-center w-full m-4'>
              <label htmlFor="level" className='block mb-2 font-bold text-lg' >レベル</label>
              <div className="flex justify-center gap-4">
                {levels.map((level) => (
                  <label key={level.label} className="flex items-center">
                    <input
                      type="radio"
                      value={level.value}
                      defaultChecked={defaults.level === level.value}
                      {...register("level", { required: { value: true, message: "レベルは必須です" } })}
                    />
                    <span className="ml-2">{level.label}</span>
                  </label>
                ))}
              </div>
              {errors.level && <p className="text-red-500 text-sm">{errors.level.message}</p>}
            </div>
            <div className='flex flex-col items-center w-full m-4'>
              <label htmlFor="year" className='block mb-2 font-bold text-lg' >学年</label>
              <input 
                type="number" 
                placeholder="学年" 
                {...defaults.year && { defaultValue: defaults.year }}
                className="border p-2 rounded w-64" 
                {...register("year", { required: { value: true, message: "学年は必須です" }, min: { value: 1, message: "学年は1以上でなければなりません" }, max: { value: 100, message: "学年は100以下でなければなりません" } })}
              />
              {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
            </div>
            <div className='flex flex-col items-center w-full m-4'>
              <label htmlFor="gender" className='block mb-2 font-bold text-lg' >性別</label>
              <div className="flex justify-center gap-4">
                {genders.map((gender) => (
                  <label key={gender.label} className="flex justify-center">
                    <input
                      type="radio"
                      value={gender.value.toString()}
                      defaultChecked={defaults.gender === gender.value}
                      {...register("gender", { required: { value: true, message: "性別は必須です" } })}
                    />
                    <span className="ml-2">{gender.label}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
            </div>
          </div>
           <SubmitButton label={formname} isLoading={isLoading} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer" />
        </form>
    </div>
  )
}
