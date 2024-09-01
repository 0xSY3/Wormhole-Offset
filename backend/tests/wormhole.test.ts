import { sendMessageToWormhole, receiveMessageFromWormhole } from "../src/blockchain/wormhole";

test("Wormhole message sending and receiving", async () => {
    const vaa = await sendMessageToWormhole("Test message", 3);
    expect(vaa).toBeDefined();

    const parsedMessage = await receiveMessageFromWormhole(vaa);
    expect(parsedMessage).toBe("Test message");
});
