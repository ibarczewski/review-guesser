import ping from "../../commands/ping";
import { SlashCommandBuilder } from "@discordjs/builders";

const mockSetName = jest.fn();
const mockSetDescription = jest.fn();

jest.mock("@discordjs/builders", () => {
  return {
    SlashCommandBuilder: jest.fn().mockImplementation(() => {
      return {
        setName: mockSetName,
        setDescription: mockSetDescription,
      };
    }),
  };
});

describe("commands#ping", () => {
  test("should reply with pong when invoked", () => {
    const mockInteraction = { reply: jest.fn() };
    ping.execute(mockInteraction);

    expect(mockInteraction.reply).toHaveBeenCalledWith("Pong!");
  });

  test("should set the name and description to their appropriate values", () => {
    expect(mockSetDescription).toHaveBeenCalledWith("Replies with Pong!");
    expect(mockSetName).toHaveBeenCalledWith("ping");
  });
});
