import { Items } from "../page";

interface ItemProps {
  params: Promise<{id: string}>
  searchParams:Promise<{}>
}

export default async function ItemPage({params}:ItemProps) {

  const {id} = await params;

  const result = await fetch(`http://localhost:4006/items/${id}`);
  const data = await result.json() as Items;

  return (
    <div className="mt-20 flex flex-col items-center">
     {data.name}
    </div>
  );
}
