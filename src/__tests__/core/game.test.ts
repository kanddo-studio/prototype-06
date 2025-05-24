import Phaser from "phaser";
import { config, init } from "../../core/game";

jest.mock("../../styles/global.css", () => {});

describe("Phaser Game Initialization", () => {
  it("should create a new Phaser game instance with the correct config", () => {
    const PhaserGameMock = jest.fn();
    Phaser.Game = PhaserGameMock;
    init();
    expect(PhaserGameMock).toHaveBeenCalledWith(config);
  });
});
