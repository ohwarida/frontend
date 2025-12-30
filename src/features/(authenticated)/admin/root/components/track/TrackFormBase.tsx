import React, { useActionState, useEffect } from 'react'
import { useTrackButtonStore } from '@/store/trackButton.store'
import FieldInput from '@/components/form/FieldInput'
import FieldSelect from '@/components/form/FieldSelect'
import Button from '@/components/ui/button/Button'
import { Loader2 } from 'lucide-react'

export default function TrackFormBase({
  mode,
  action,
  initial,
}: {
  mode: 'create' | 'edit'
  action: (
    prevState: FormStateTypes<TrackFormTypes>,
    formData: FormData,
  ) => Promise<FormStateTypes<TrackFormTypes>>
  initial: FormStateTypes<TrackFormTypes>
}) {
  const setField = useTrackButtonStore((s) => s.setField)
  const reset = useTrackButtonStore((s) => s.reset)

  const [state, formAction, isPending] = useActionState<FormStateTypes<TrackFormTypes>, FormData>(
    action,
    initial,
  )

  useEffect(() => {
    if (!state.success) return

    setField('trackName', state.values?.trackName)
    setField('startDate', state.values?.startDate as string)
    setField('endDate', state.values?.endDate as string)
    setField('trackStatus', state.values?.trackStatus as TrackStatus)

    if (mode === 'create') reset()
  }, [state.success, mode, reset, setField, state.values])

  const isEdit = mode === 'edit'

  return (
    <>
      <section className="z-20 mt-4 rounded-md border border-gray-200 bg-white p-5">
        <form action={formAction}>
          <div className="flex w-full items-start justify-between gap-2 space-y-4 overflow-y-auto">
            <FieldInput
              name="trackName"
              label="트랙명"
              id="trackName"
              required
              outerClassName="w-full"
              placeholder="FE, BE, AI 등"
              errorMessage={state.fieldErrors?.trackName?.[0]}
              defaultValue={state.values?.trackName ?? ''}
            />

            <FieldInput
              type="date"
              name="startDate"
              label="시작일"
              id="startDate"
              outerClassName="w-full"
              required
              errorMessage={state.fieldErrors?.startDate?.[0]}
              defaultValue={toDateValue(state.values?.startDate)}
            />

            <FieldInput
              type="date"
              name="endDate"
              label="종료일"
              id="endDate"
              outerClassName="w-full"
              required
              errorMessage={state.fieldErrors?.endDate?.[0]}
              defaultValue={toDateValue(state.values?.endDate)}
            />

            <FieldSelect
              name="trackStatus"
              label="상태"
              id="trackStatus"
              inputClassName="h-10"
              required
              outerClassName="w-full"
              options={[
                { label: '재학', value: 'ENROLLED' },
                { label: '수료', value: 'GRADUATED' },
              ]}
              errorMessage={state.fieldErrors?.trackStatus?.[0]}
              defaultValue={state.values?.trackStatus ?? 'GRADUATED'}
            />
          </div>

          <div className="flex justify-end">
            <Button
              variant="add"
              type="submit"
              icon={isPending ? <Loader2 className="animate-spin" /> : null}
            >
              {isPending ? (isEdit ? '수정중...' : '생성중...') : isEdit ? '수정' : '생성'}
            </Button>
          </div>
        </form>
      </section>
    </>
  )
}

function toDateValue(v?: string | Date) {
  if (!v) return ''
  if (v instanceof Date) {
    const yyyy = v.getFullYear()
    const mm = String(v.getMonth() + 1).padStart(2, '0')
    const dd = String(v.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }
  return v.length >= 10 ? v.slice(0, 10) : v
}
