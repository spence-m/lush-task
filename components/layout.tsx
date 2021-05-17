import Link from "next/link";
import React from "react";

interface LayoutProps {
  children: React.ReactChild;
}

export default function Layout(props: LayoutProps): JSX.Element {
  return (
    <>
      <header className="fixed bg-gray-900 h-24 w-full z-10 p-4">
        <Link href="/">
          <h1 className="text-6xl uppercase font-bold text-white cursor-pointer tracking-wider">BLUSH</h1>
        </Link>
      </header>
      <main className="p-8 pt-28 bg-gray-50">{props.children}</main>
      <footer className="bg-gray-900 h-24 p-4">
        <p className="text-sm uppercase font-bold text-white tracking-wider">BLUSH - 2021</p>
      </footer>
    </>
  );
}
