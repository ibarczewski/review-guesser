import ping from "../../commands/ping";
import { SlashCommandBuilder } from "@discordjs/builders";

jest.mock("@discordjs/builders");

describe("commands#ping", () => {
  test("should reply with pong when invoked", () => {
    const fake = { reply: jest.fn() };
    ping.execute(fake);

    expect(fake.reply).toHaveBeenCalledWith("Pong!");
  });
});
