// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@wormhole-foundation/evm-contracts/Wormhole.sol";

contract WormholeBridge is Ownable, ERC721URIStorage {
    IWormhole public wormhole;
    uint256 public nextTokenId;

    event NFTReceived(address to, uint256 tokenId, string tokenURI);

    constructor(address _wormhole) ERC721("WormholeBridgeNFT", "WBNFT") {
        wormhole = IWormhole(_wormhole);
        nextTokenId = 1;
    }

    function mintAndSend(
        address to,
        string memory tokenURI,
        uint16 destinationChainId
    ) public onlyOwner {
        uint256 tokenId = nextTokenId;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        nextTokenId++;

        bytes memory payload = abi.encode(to, tokenId, tokenURI);
        uint32 nonce = 0; 
        wormhole.publishMessage(nonce, payload, destinationChainId);
    }

    function receiveMessage(bytes memory signedVAA) public {
        (IWormhole.VM memory vm, bool valid, string memory reason) = wormhole.parseAndVerifyVM(signedVAA);
        
        require(valid, string(abi.encodePacked("Invalid message: ", reason)));
        require(vm.emitterChainId != wormhole.chainId(), "Cannot receive messages from the same chain");

        (address to, uint256 originalTokenId, string memory tokenURI) = abi.decode(vm.payload, (address, uint256, string));

        uint256 newTokenId = nextTokenId;
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        nextTokenId++;

        emit NFTReceived(to, newTokenId, tokenURI);
    }

    function totalSupply() public view returns (uint256) {
        return nextTokenId - 1;
    }
}