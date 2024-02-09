import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Inter } from "next/font/google"
import Link from "next/link"
import MintButton from "@/components/MintButton"
import { Toaster } from "@/components/ui/toaster"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <div className={`flex flex-col min-h-screen ${inter.className}`}>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Danger</AlertTitle>
        <AlertDescription>
          This is a demo website on the Sepolia Testnet! You will lose your ETH!
          You have been warned!
        </AlertDescription>
      </Alert>
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
            href="#get-started"
          >
            How-to
          </Link>
          <Link
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            href="https://github.com/yaseenshaik"
          >
            Github
          </Link>
        </nav>
      </header>
      <main className="relative flex flex-col items-center justify-center flex-grow text-center p-4 h-svh overflow-hidden">
        <div className="backdrop-blur-md p-10 md:p-16 rounded-lg">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            Mint Your NFTs Today
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-200">
            Join the world of digital art and create your own NFT collection.
          </p>
          <MintButton />
        </div>
        <video
          autoPlay
          loop
          muted
          className="absolute w-auto min-w-full min-h-full max-w-none -z-10"
        >
          <source src="/sqrls_movie.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </main>

      <section className="p-6 bg-gray-100 dark:bg-gray-900" id="get-started">
        <h2 className="text-3xl p-8 font-bold text-center text-gray-900 dark:text-white">
          Get Yours Now!
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <Card>
            <img
              alt="NFT 1"
              className="w-full h-64 object-cover"
              height="200"
              src="/img/mint_button.jpg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
            <CardHeader>
              <CardTitle>Step 1</CardTitle>
            </CardHeader>
            <CardContent>
              Click on the &quot;Start Minting&quot; and connect your Metamask
              account.
            </CardContent>
          </Card>
          <Card>
            <img
              alt="NFT 2"
              className="w-full h-64 object-contain"
              height="200"
              src="/img/confirm_txn.png"
              style={{
                aspectRatio: "200/200",
                objectFit: "contain",
              }}
              width="200"
            />
            <CardHeader>
              <CardTitle>Step 2</CardTitle>
            </CardHeader>
            <CardContent>Confirm the transaction on Metamask.</CardContent>
          </Card>
          <Card>
            <img
              alt="NFT 3"
              className="w-full h-64 object-cover"
              height="200"
              src="/img/minted_zoom.jpg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
            <CardHeader>
              <CardTitle>Step 3</CardTitle>
            </CardHeader>
            <CardContent>
              Congratulations! A shiny new NFT is yours!
            </CardContent>
          </Card>
        </div>
      </section>
      <footer className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 flex-col md:flex-row">
        <div className="flex space-x-4">
          <Link
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            href="https://github.com/yaseenshaik/next-openzeppelin-demo"
          >
            Github
          </Link>
          {/* <Link
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            href="#"
          >
            Instagram
          </Link> */}
        </div>
        <p className="text-gray-600 dark:text-gray-300">© 2024 @yaseenshaik</p>
      </footer>
      <Toaster />
    </div>
  )
}
