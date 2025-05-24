import { Entity, InputComponent } from "kanji-ecs";
import { GamepadSystem } from "../../../core/systems/GamepadSystem";

describe("GamepadSystem", () => {
  let mockEntity: Entity;
  let mockInputComponent: InputComponent;
  let gamepadSystem: GamepadSystem;
  let mockScene: any;
  let mockPad: any;

  beforeEach(() => {
    mockEntity = new Entity();
    mockInputComponent = new InputComponent();
    mockEntity.add("input", mockInputComponent);

    mockPad = {
      axes: [
        { getValue: jest.fn().mockReturnValue(0) },
        { getValue: jest.fn().mockReturnValue(0) },
      ],
      buttons: Array(16).fill({ value: 0 }),
    };

    mockScene = {
      input: {
        gamepad: {
          once: jest.fn((event, callback) => {
            if (event === "connected") {
              callback(mockPad);
            }
          }),
        },
      },
    };
  });

  it("should connect to gamepad when available", () => {
    gamepadSystem = new GamepadSystem(mockScene);
    expect(mockScene.input.gamepad.once).toHaveBeenCalledWith(
      "connected",
      expect.any(Function),
    );
    expect(gamepadSystem.pad).toBe(mockPad);
  });

  it("should not throw if scene.input is undefined", () => {
    mockScene.input = undefined;
    expect(() => new GamepadSystem(mockScene)).not.toThrow();
  });

  it("should not throw if scene.input.gamepad is undefined", () => {
    mockScene.input.gamepad = undefined;
    expect(() => new GamepadSystem(mockScene)).not.toThrow();
  });

  it("should update keys when dpad buttons are pressed", () => {
    gamepadSystem = new GamepadSystem(mockScene);
    mockPad.buttons[14] = { value: 1 };
    mockPad.buttons[15] = { value: 1 };
    mockPad.buttons[12] = { value: 1 };
    mockPad.buttons[13] = { value: 1 };

    gamepadSystem.update([mockEntity]);

    expect(mockInputComponent.keys.has("ArrowLeft")).toBe(true);
    expect(mockInputComponent.keys.has("ArrowRight")).toBe(true);
    expect(mockInputComponent.keys.has("ArrowUp")).toBe(true);
    expect(mockInputComponent.keys.has("ArrowDown")).toBe(true);
  });

  it("should update keys when axes are moved beyond threshold", () => {
    gamepadSystem = new GamepadSystem(mockScene);
    mockPad.axes[0].getValue.mockReturnValue(-0.6);
    mockPad.axes[1].getValue.mockReturnValue(0.7);

    gamepadSystem.update([mockEntity]);

    expect(mockInputComponent.keys.has("ArrowLeft")).toBe(true);
    expect(mockInputComponent.keys.has("ArrowDown")).toBe(true);
  });

  it("should update keys when axes are moved beyond threshold 2", () => {
    gamepadSystem = new GamepadSystem(mockScene);
    mockPad.axes[0].getValue.mockReturnValue(0.6);
    mockPad.axes[1].getValue.mockReturnValue(-0.7);

    gamepadSystem.update([mockEntity]);

    expect(mockInputComponent.keys.has("ArrowRight")).toBe(true);
    expect(mockInputComponent.keys.has("ArrowUp")).toBe(true);
  });

  it("should not update keys when axes are within threshold", () => {
    gamepadSystem = new GamepadSystem(mockScene);
    mockPad.axes[0].getValue.mockReturnValue(-0.4);
    mockPad.axes[1].getValue.mockReturnValue(0.4);

    gamepadSystem.update([mockEntity]);

    expect(mockInputComponent.keys.has("ArrowLeft")).toBe(false);
    expect(mockInputComponent.keys.has("ArrowRight")).toBe(false);
    expect(mockInputComponent.keys.has("ArrowUp")).toBe(false);
    expect(mockInputComponent.keys.has("ArrowDown")).toBe(false);
  });

  it("should clear keys if nothing is pressed", () => {
    gamepadSystem = new GamepadSystem(mockScene);
    mockInputComponent.keys.add("ArrowLeft");
    mockInputComponent.keys.add("ArrowRight");

    gamepadSystem.update([mockEntity]);

    expect(mockInputComponent.keys.size).toBe(0);
  });

  it("should throw error if input component is missing", () => {
    gamepadSystem = new GamepadSystem(mockScene);
    const newEntity = new Entity();
    expect(() => gamepadSystem.update([newEntity])).toThrow(
      "Error: Missing Input Component",
    );
  });

  it("should throw an error if gamepad is missing during update", () => {
    gamepadSystem.pad = mockPad;

    const entity = new Entity();
    entity.add("input", new InputComponent());
    jest.spyOn(entity, "get").mockImplementationOnce(() => {
      gamepadSystem.pad = undefined;
      return new InputComponent();
    });
    expect(() => gamepadSystem.update([entity])).toThrow(
      "Error: Missing Gamepad",
    );
  });

  it("should not update if pad is not connected", () => {
    mockScene.input.gamepad.once = jest.fn();
    gamepadSystem = new GamepadSystem(mockScene);
    gamepadSystem.pad = undefined;

    const clearSpy = jest.spyOn(mockInputComponent.keys, "clear");
    gamepadSystem.update([mockEntity]);

    expect(clearSpy).not.toHaveBeenCalled();
  });
});
