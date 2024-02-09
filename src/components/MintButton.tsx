import { ethers, ContractTransactionResponse } from "ethers"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import SqrlsABI from "../../public/Sqrls.json"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Progress } from "./ui/progress"
import { ipfsToCFUri } from "@/lib/utils"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"

const steps = [
  [0, "Requesting metamask access..."],
  [10, "Please approve the transaction!"],
  [80, "Minting in progress..."],
  [100, "Congratulations!"],
]

type NFTMeta = {
  name: "string"
  image: "string"
  description: "string"
}

export default function MintButton() {
  const [status, setStatus] = useState<number | null>(null)
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [metadata, setMetadata] = useState<NFTMeta | null>(null)

  const resetState = () => {
    setOpen(false)
    setStatus(null)
    setMetadata(null)
  }

  async function mint() {
    let signer = null
    let provider

    setStatus(0)
    setOpen(true)

    if (window.ethereum == null) {
      resetState()
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "We couldn't find connect to metamask. Please install the metamask extension for your browser!.",
        action: (
          <ToastAction altText="Try again" onClick={mint}>
            Try again
          </ToastAction>
        ),
      })
    }

    provider = new ethers.BrowserProvider(window.ethereum)
    signer = await provider.getSigner()
    setStatus(1)

    const sqrlsAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
    const contract = new ethers.Contract(sqrlsAddress, SqrlsABI.abi, signer)
    let tx: ContractTransactionResponse

    try {
      tx = await contract.mint({
        value: ethers.parseEther("0.01"),
      })
    } catch (e) {
      resetState()
      return toast({
        variant: "destructive",
        title: "Transaction rejected!",
        description: "You need to approve the transaction to mint.",
        action: (
          <ToastAction altText="Try again" onClick={mint}>
            Try again
          </ToastAction>
        ),
      })
    }
    setStatus(2)

    await tx.wait()
    setStatus(3)

    const receipt = await provider.getTransactionReceipt(tx.hash)
    if (!receipt) {
      resetState()

      return toast({
        title: "NFT minted!",
        description:
          "However we couldn't find the transaction. Please check etherescan!",
      })
    }
    if (receipt?.logs?.length > 0) {
      receipt.logs.forEach(async log => {
        const { data } = log
        const topics = log.topics.map(t => String(t))
        const parsed = contract.interface.parseLog({ topics, data })
        if (parsed?.name === "Transfer") {
          const idx = parsed.args[2]
          const tokenURI: string = await contract.tokenURI(Number.parseInt(idx))

          const metadataURI = ipfsToCFUri(tokenURI)
          const res = await fetch(metadataURI).then(res => res.json())
          setMetadata(res)
        }
      })
    }
    console.log({ receipt })
    // Parse logs using the contract interface
    // const logs = ethers.utils .parseLog(receipt?.logs, contract.interface);
  }
  const step = status ? steps[status] : [-1, "Loading..."]

  return (
    <>
      <Button
        onClick={mint}
        className="mt-6 px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800"
      >
        Start Minting
      </Button>
      <AlertDialog open={open} onOpenChange={resetState}>
        <AlertDialogContent className="transition-height">
          <AlertDialogHeader>
            <AlertDialogTitle>{step[1] as string}</AlertDialogTitle>
            {metadata !== null && (
              <AlertDialogDescription className="animate-in zoom-in">
                <div className="mb-2">
                  You&apos;re the now owner of this shiny new NFT!
                </div>
                <Card>
                  <div className="min-w-52 h-64">
                    <img
                      alt={metadata.name}
                      className="w-full h-64 object-cover"
                      height="200"
                      src={ipfsToCFUri(metadata.image)}
                      style={{
                        aspectRatio: "200/200",
                        objectFit: "cover",
                      }}
                      width="200"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{metadata.name}</CardTitle>
                  </CardHeader>
                  <CardContent>{metadata.description}</CardContent>
                </Card>
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            {step[0] === 100 ? (
              <AlertDialogCancel>Close</AlertDialogCancel>
            ) : (
              <Progress value={step[0] as number} />
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
