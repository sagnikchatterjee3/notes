import Link from "next/link";

export default function Home() {
  return (
   <main className="p-4 ">
    <h2>My Notes on Web development, Typescript and the React Ecosystem</h2>
    <Link href="/blog">
      <div className="p-4 text-xl">Blog</div>
    </Link>
   </main>
  )
}
