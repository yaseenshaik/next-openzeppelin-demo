require("dotenv").config({ path: "../.env" })
import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"

const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY as string
const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL

console.log({ SEPOLIA_PRIVATE_KEY, ALCHEMY_SEPOLIA_URL })

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: ALCHEMY_SEPOLIA_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
}

export default config
