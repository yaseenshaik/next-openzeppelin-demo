import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("Sqrls", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearSqrlsFixture() {
    const maxSupply = 5
    const baseURI = "https://sqrls.com/sqrl/"
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners()

    const Sqrls = await ethers.getContractFactory("Sqrls")
    const sqrls = await Sqrls.deploy(maxSupply, baseURI)

    return { sqrls, maxSupply, baseURI, owner, otherAccount }
  }

  describe("Deployment", function () {
    it("Should set the right baseURI", async function () {
      const { sqrls, baseURI } = await loadFixture(deployOneYearSqrlsFixture)

      expect(await sqrls.baseURI()).to.equal(baseURI)
    })

    it("Should set the right maxSupply", async function () {
      const { sqrls, maxSupply } = await loadFixture(deployOneYearSqrlsFixture)

      expect(await sqrls.maxSupply()).to.equal(maxSupply)
    })

    it("Should set the right owner", async function () {
      const { sqrls, owner } = await loadFixture(deployOneYearSqrlsFixture)

      expect(await sqrls.owner()).to.equal(owner.address)
    })
  })

  describe("Minting", function () {
    it("Should revert if no ETH is sent", async function () {
      const { sqrls, otherAccount } = await loadFixture(
        deployOneYearSqrlsFixture
      )

      await expect(sqrls.connect(otherAccount).mint()).to.be.revertedWith(
        "Send at least 0.01 ETH!"
      )
    })

    it("Should revert if less than 0.01 ETH is sent", async function () {
      const { sqrls, otherAccount } = await loadFixture(
        deployOneYearSqrlsFixture
      )

      await expect(
        sqrls.connect(otherAccount).mint({ value: ethers.parseEther("0.009") })
      ).to.be.revertedWith("Send at least 0.01 ETH!")
    })

    it("Should mint maxSupply and revert for more", async function () {
      const { sqrls, otherAccount, maxSupply } = await loadFixture(
        deployOneYearSqrlsFixture
      )

      for (let i = 0; i < maxSupply; i++) {
        await sqrls
          .connect(otherAccount)
          .mint({ value: ethers.parseEther("0.01") })
      }
      await expect(
        sqrls.connect(otherAccount).mint({ value: ethers.parseEther("0.009") })
      ).to.be.revertedWith("No more NFTs to mint!")
    })

    it("Should mint to the right account", async function () {
      const { sqrls, otherAccount } = await loadFixture(
        deployOneYearSqrlsFixture
      )
      await sqrls
        .connect(otherAccount)
        .mint({ value: ethers.parseEther("0.01") })

      expect(await sqrls.connect(otherAccount).ownerOf(0)).to.be.equal(
        otherAccount.address
      )
    })

    it("Should increase balance after minting", async function () {
      const { sqrls, otherAccount } = await loadFixture(
        deployOneYearSqrlsFixture
      )

      const ethVal = ethers.parseEther("0.01")
      await sqrls.connect(otherAccount).mint({ value: ethVal })

      expect(await ethers.provider.getBalance(sqrls.target)).to.equal(ethVal)
    })
  })

  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called from another account", async function () {
        const { sqrls, otherAccount } = await loadFixture(
          deployOneYearSqrlsFixture
        )
        const ethVal = ethers.parseEther("0.01")
        await sqrls.connect(otherAccount).mint({ value: ethVal })
        // We use sqrls.connect() to send a transaction from another account
        await expect(sqrls.connect(otherAccount).withdraw()).to.be.revertedWith(
          "You aren't the owner"
        )
      })
      it("Shouldn't fail if the owner calls it", async function () {
        const { sqrls, otherAccount } = await loadFixture(
          deployOneYearSqrlsFixture
        )
        const ethVal = ethers.parseEther("0.01")
        await sqrls.connect(otherAccount).mint({ value: ethVal })

        await expect(sqrls.withdraw()).not.to.be.reverted
      })
    })
    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { sqrls, otherAccount } = await loadFixture(
          deployOneYearSqrlsFixture
        )
        const ethVal = ethers.parseEther("0.01")
        await sqrls.connect(otherAccount).mint({ value: ethVal })
        await expect(sqrls.withdraw())
          .to.emit(sqrls, "Withdrawal")
          .withArgs(ethers.parseEther("0.01"), anyValue) // We accept any value as `when` arg
      })
    })
    describe("Transfers", function () {
      it("Should transfer the funds to the owner", async function () {
        const { sqrls, otherAccount, owner } = await loadFixture(
          deployOneYearSqrlsFixture
        )
        const ethVal = ethers.parseEther("0.01")
        await sqrls.connect(otherAccount).mint({ value: ethVal })
        await expect(sqrls.withdraw()).to.changeEtherBalances(
          [owner, sqrls],
          [ethVal, -ethVal]
        )
      })
    })
  })
})
