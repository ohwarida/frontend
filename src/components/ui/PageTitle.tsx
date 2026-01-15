export default async function PageTitle({ title, subTitle }: { title: string; subTitle?: string }) {
  return (
    <div className="space-y-3 px-1">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-gray-700">{subTitle}</p>
    </div>
  )
}
