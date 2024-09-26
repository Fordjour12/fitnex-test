export default function page({ params }: { params: { id: string } }) {
  const exerciseId = params.id;

  return (
    <div>
      <h1>Update Exercise</h1>
      <p>Exercise ID: {exerciseId}</p>
    </div>
  );
}
