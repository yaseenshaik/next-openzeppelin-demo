import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <div className={`flex flex-col min-h-screen ${inter.className}`}>
      <header className="flex items-center justify-between p-6 bg-white dark:bg-gray-800">
        <Link
          className="text-2xl font-bold text-gray-900 dark:text-white"
          href="#"
        >
          NFT Mint
        </Link>
        <nav className="space-x-4">
          <Link
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow text-center p-4">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Mint Your NFTs Today
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Join the world of digital art and create your own NFT collection.
        </p>
        <Button className="mt-6 px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg">
          Start Minting
        </Button>
      </main>
      <section className="p-6 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Featured NFTs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <Card>
            <img
              alt="NFT 1"
              className="w-full h-64 object-cover"
              height="200"
              src="/placeholder.svg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
            <CardHeader>
              <CardTitle>NFT Title 1</CardTitle>
            </CardHeader>
            <CardContent>This is a brief description of the NFT.</CardContent>
          </Card>
          <Card>
            <img
              alt="NFT 2"
              className="w-full h-64 object-cover"
              height="200"
              src="/placeholder.svg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
            <CardHeader>
              <CardTitle>NFT Title 2</CardTitle>
            </CardHeader>
            <CardContent>This is a brief description of the NFT.</CardContent>
          </Card>
          <Card>
            <img
              alt="NFT 3"
              className="w-full h-64 object-cover"
              height="200"
              src="/placeholder.svg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
            <CardHeader>
              <CardTitle>NFT Title 3</CardTitle>
            </CardHeader>
            <CardContent>This is a brief description of the NFT.</CardContent>
          </Card>
        </div>
      </section>
      <footer className="flex items-center justify-between p-6 bg-white dark:bg-gray-800">
        <div className="flex space-x-4">
          <Link
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            href="#"
          >
            Twitter
          </Link>
          <Link
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            href="#"
          >
            Instagram
          </Link>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          © 2024 NFT Mint. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
