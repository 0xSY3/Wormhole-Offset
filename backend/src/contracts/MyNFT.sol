// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@wormhole-foundation/wormhole-solidity-sdk/contracts/interfaces/IWormhole.sol";

contract WormholeNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    IWormhole public wormhole;
    uint16 public constant CHAIN_ID_ETH = 2;
    uint32 public nonce;

    mapping(uint256 => bool) public bridgedTokens;

    event NFTBridgeInitiated(uint256 tokenId, uint16 targetChain);
    event NFTBridgeCompleted(uint256 tokenId, address recipient);

    constructor(address _wormhole) ERC721("WormholeNFT", "WNFT") {
        wormhole = IWormhole(_wormhole);
    }

    function mint(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        return newTokenId;
    }

    function bridgeNFT(uint256 tokenId, uint16 targetChain) public {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "Caller is not owner nor approved");
        require(!bridgedTokens[tokenId], "Token already bridged");

        string memory tokenURI = tokenURI(tokenId);
        address owner = ownerOf(tokenId);

        _burn(tokenId);

       bridgedTokens[tokenId] = true;
       bytes memory payload = abi.encode(tokenId, owner, tokenURI);

        uint256 fee = wormhole.messageFee();
        wormhole.publishMessage{value: fee}(nonce, payload, targetChain);
        nonce++;

        emit NFTBridgeInitiated(tokenId, targetChain);
    }

    function completeNFTBridge(bytes memory encodedVM) public {
        (IWormhole.VM memory vm, bool valid, string memory reason) = wormhole.parseAndVerifyVM(encodedVM);
        require(valid, string(abi.encodePacked("Invalid VM: ", reason)));
        require(vm.emitterChainId != CHAIN_ID_ETH, "Cannot bridge from same chain");

        (uint256 tokenId, address recipient, string memory tokenURI) = abi.decode(vm.payload, (uint256, address, string));

        require(!_exists(tokenId), "Token already exists");

        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit NFTBridgeCompleted(tokenId, recipient);
    }

    function setWormhole(address _wormhole) public onlyOwner {
        wormhole = IWormhole(_wormhole);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
        require(!bridgedTokens[tokenId], "Token is bridged and cannot be transferred");
    }
}