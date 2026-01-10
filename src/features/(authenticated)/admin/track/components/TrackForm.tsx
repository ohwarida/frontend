'use client'

import { createTrackAction } from '@/features/(authenticated)/admin/track/actions/createTrack.action'
import React, { useActionState } from 'react'
import FieldInput from '@/components/form/FieldInput'
import FieldSelect from '@/components/form/FieldSelect'
import Button from '@/components/ui/button/Button'
import { Loader2 } from 'lucide-react'

export const initialState: FormStateTypes<TrackFormTypes> = {
  values: {
    trackName: '',
    startDate: '',
    endDate: '',
    trackStatus: 'GRADUATED',
  },
  fieldErrors: {},
  success: false,
}

export function TrackForm() {
  const [state, formAction, isPending] = useActionState<FormStateTypes<TrackFormTypes>, FormData>(
    createTrackAction,
    initialState,
  )
  return (
    <form action={formAction} className="space-y-4">
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        <FieldInput
          name="trackName"
          label="트랙명"
          id="trackName"
          required
          placeholder="FE, BE, AI 등"
          errorMessage={state.fieldErrors?.trackName?.[0]}
        />

        <div className="grid grid-cols-2 gap-3">
          <FieldInput
            type="date"
            name="startDate"
            label="시작일"
            id="startDate"
            required
            errorMessage={state.fieldErrors?.startDate?.[0]}
          />

          <FieldInput
            type="date"
            name="endDate"
            label="종료일"
            id="endDate"
            required
            errorMessage={state.fieldErrors?.endDate?.[0]}
          />
        </div>

        <FieldSelect
          name="trackStatus"
          label="상태"
          id="trackStatus"
          inputClassName="h-10"
          defaultValue="GRADUATED"
          required
          options={[
            { label: 'ENROLLED', value: 'ENROLLED' },
            { label: 'GRADUATED', value: 'GRADUATED' },
          ]}
          errorMessage={state.fieldErrors?.trackStatus?.[0]}
        />
      </div>

      <div className="flex justify-end gap-2 border-t border-gray-300 p-4">
        <Button
          variant="add"
          type="submit"
          icon={isPending ? <Loader2 className="animate-spin" /> : null}
        >
          {isPending ? '생성중...' : '생성'}
        </Button>
      </div>
    </form>
  )
}
