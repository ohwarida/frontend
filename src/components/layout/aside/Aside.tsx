import Feed from '@/components/layout/aside/Feed'
import Dashboard from './Dashboard'

const Aside = () => {
  return (
    <aside className="hidden lg:sticky lg:top-[89px] lg:block lg:h-full lg:min-w-72">
      <div className="space-y-5">
        <Feed />
        <Dashboard />
      </div>
    </aside>
  )
}

export default Aside
