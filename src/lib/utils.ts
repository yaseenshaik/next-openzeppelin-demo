import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const cloudFlareBaseURI = "https://cloudflare-ipfs.com/"

export function ipfsToCFUri(ipfsURI: string) {
  return cloudFlareBaseURI + ipfsURI.replace(":/", "")
}
