export default function Page({ params }: { params: { id: string } }) {
  return <div>My User id : {params.id}</div>
}
