import MiddleModal from '@/components/modal/MiddleModal'
import { CreateStudyModal } from '@/features/(authenticated)/post/components/CreateStudyModal'
import { getUser } from '@/features/(authenticated)/users/apis/user.api'

export default async function CreateStudyPanelPage() {
  const user = await getUser()

  return (
    <MiddleModal returnTo="/study">
      <CreateStudyModal
        fixedTrack={{
          id: user.trackId,
          name: user.trackName,
        }}
      />
    </MiddleModal>
  )
}
