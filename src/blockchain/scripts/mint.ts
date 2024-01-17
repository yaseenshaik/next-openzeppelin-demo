import { ethers } from "hardhat"

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000)
  const totalSupply = 62
  const lockedAmount = ethers.parseEther("0.001")

  const lock = await ethers.deployContract("Sqrls", [
    totalSupply,
    "https://sqrls.com/img/sqrls/",
  ])

  for (let i = 0; i < 3; i++) {
    await lock.waitForDeployment()

    const tx = await lock.mint()
    await tx.wait()
  }

  console.log(`Lock with ${ethers.formatEther(lockedAmount)}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
