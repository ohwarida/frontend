export default function StudyLayout({
  children,
  panel,
}: {
  children: React.ReactNode
  panel: React.ReactNode
}) {
  return (
    <>
      {children}
      {panel}
    </>
  )
}
