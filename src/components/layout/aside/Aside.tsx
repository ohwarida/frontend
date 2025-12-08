import React from 'react'
import StatCard from "@/components/layout/aside/StatCard";
import Feed from "@/components/layout/aside/Feed";

const Aside = () => {
  return (
    <aside className="h-full min-w-72 sticky top-[100px]">
      <div className="space-y-5">
        <section className="w-full rounded-md border border-gray-200 bg-white p-4">
          <Feed/>
        </section>

        <section className="w-full rounded-md border border-gray-200 bg-white p-4 space-y-3">
          <StatCard
            label="전체 게시글"
            value="1,234"
            icon="dd"
            variant="blue"
          />
          <StatCard
            label="활동 멤버"
            value="456"
            icon="dd"
            variant="green"
          />
          <StatCard
            label="이번 주 조회수"
            value="658"
            icon="fdfd"
            variant="orange"
          />
        </section>
      </div>
    </aside>
  )
}

export default Aside
