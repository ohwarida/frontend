'use server'

import { server } from '@/lib/api/server'

export async function changeProfile(formData: FormData) {
  await server('/api/v1/users/profiles/me', {
    body: formData,
    method: 'POST',
  })
}
