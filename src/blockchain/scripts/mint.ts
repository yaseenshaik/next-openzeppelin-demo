import { ethers } from "hardhat"

async function main() {
  const totalSupply = 62

  const sqrls = await ethers.deployContract("Sqrls", [
    totalSupply,
    "ipfs://bafybeifxrt6hgqwxqbtcjkuvly37qh6fiq2swfseytwkkbacg5lqhpebuy/",
  ])
  await sqrls.waitForDeployment()

  console.log(`SQRLS deployed at ${await sqrls.getAddress()}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
