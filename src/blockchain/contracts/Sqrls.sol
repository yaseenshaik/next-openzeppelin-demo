// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Sqrls is ERC721URIStorage {
  uint public maxSupply;
  address payable public owner;
  string public baseURI;
  uint256 private _nextTokenId = 0;

  event Withdrawal(uint amount, uint when);

  constructor(
    uint _supply,
    string memory _baseURI
  ) payable ERC721("Sqrls", "SQRLS") {
    maxSupply = _supply;
    baseURI = _baseURI;
    owner = payable(msg.sender);
  }

  function mint() public payable returns (uint256) {
    require(_nextTokenId < maxSupply, "No more NFTs to mint!");
    require(msg.value >= 1e16, "Send at least 0.01 ETH!");

    uint256 tokenId = _nextTokenId++;
    _mint(msg.sender, tokenId);
    // console.log(string.concat(baseURI, Strings.toString(tokenId + 1)));
    _setTokenURI(
      tokenId,
      string.concat(baseURI, Strings.toString(tokenId + 1))
    );

    return tokenId;
  }

  function withdraw() public {
    // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
    // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

    require(msg.sender == owner, "You aren't the owner");

    emit Withdrawal(address(this).balance, block.timestamp);

    owner.transfer(address(this).balance);
  }
}
