export default async function PageTitle({ title, subTitle }: { title: string; subTitle?: string }) {
  return (
    <section className="hidden space-y-1 lg:sticky lg:top-(--header-h) lg:z-10 lg:-mx-5 lg:-mt-6 lg:block lg:bg-(--app-bg) lg:px-5 lg:pt-6 lg:pb-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-gray-700">{subTitle}</p>
    </section>
  )
}
