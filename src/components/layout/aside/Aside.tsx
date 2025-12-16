import Feed from "@/components/layout/aside/Feed";
import Dashboard from './Dashboard';

const Aside = () => {
  return (
    <aside className="h-full min-w-72 sticky top-[100px]">
      <div className="space-y-5">
        <Feed/>
        <Dashboard />
      </div>
    </aside>
  )
}

export default Aside
