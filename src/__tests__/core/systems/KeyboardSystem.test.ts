import Phaser from "phaser";

import { Entity, InputComponent } from "kanji-ecs";
import { KeyboardSystem } from "../../../core/systems/KeyboardSystem";

describe("KeyboardSystem", () => {
  let mockScene: Phaser.Scene;
  let mockEntity: Entity;
  let mockInputComponent: InputComponent;
  let keyboardSystem: KeyboardSystem;

  beforeEach(() => {
    mockScene = new Phaser.Scene();

    mockEntity = new Entity();
    mockInputComponent = new InputComponent();

    mockEntity.add("input", mockInputComponent);
  });

  it("should initialize with keyboard input", () => {
    mockScene.input = {
      keyboard: {
        createCursorKeys: jest.fn().mockReturnValue({
          left: { isDown: false },
          right: { isDown: false },
          up: { isDown: false },
          down: { isDown: false },
        }),
      },
    } as any;

    keyboardSystem = new KeyboardSystem(mockScene);
    expect(mockScene.input.keyboard?.createCursorKeys).toHaveBeenCalled();
  });

  it("should update the keys when left arrow is pressed", () => {
    mockScene.input = {
      keyboard: {
        createCursorKeys: jest.fn().mockReturnValue({
          left: { isDown: false },
          right: { isDown: false },
          up: { isDown: true },
          down: { isDown: false },
        }),
      },
    } as any;

    keyboardSystem = new KeyboardSystem(mockScene);
    keyboardSystem.update([mockEntity]);

    expect(mockInputComponent.keys.has("ArrowUp")).toBe(true);
  });

  it("should update the keys when right arrow is pressed", () => {
    mockScene.input = {
      keyboard: {
        createCursorKeys: jest.fn().mockReturnValue({
          left: { isDown: false },
          right: { isDown: true },
          up: { isDown: false },
          down: { isDown: false },
        }),
      },
    } as any;

    keyboardSystem = new KeyboardSystem(mockScene);
    const addSpy = jest.spyOn(mockInputComponent.keys, "add");

    keyboardSystem.update([mockEntity]);

    expect(addSpy).toHaveBeenCalledWith("ArrowRight");
    expect(mockInputComponent.keys.has("ArrowRight")).toBe(true);
  });

  it("should update the keys when double (diagonal) arrow is pressed", () => {
    mockScene.input = {
      keyboard: {
        createCursorKeys: jest.fn().mockReturnValue({
          left: { isDown: true },
          right: { isDown: false },
          up: { isDown: false },
          down: { isDown: true },
        }),
      },
    } as any;

    keyboardSystem = new KeyboardSystem(mockScene);
    const addSpy = jest.spyOn(mockInputComponent.keys, "add");

    keyboardSystem.update([mockEntity]);

    expect(addSpy).toHaveBeenCalledWith("ArrowLeft");
    expect(addSpy).toHaveBeenCalledWith("ArrowDown");
    expect(mockInputComponent.keys.has("ArrowLeft")).toBe(true);
    expect(mockInputComponent.keys.has("ArrowDown")).toBe(true);
  });

  it("should remove keys when they are not pressed", () => {
    mockScene.input = {
      keyboard: {
        createCursorKeys: jest.fn().mockReturnValue({
          left: { isDown: false },
          right: { isDown: false },
          up: { isDown: false },
          down: { isDown: false },
        }),
      },
    } as any;

    keyboardSystem = new KeyboardSystem(mockScene);

    keyboardSystem.update([mockEntity]);

    expect(mockInputComponent.keys.has("ArrowLeft")).toBe(false);
    expect(mockInputComponent.keys.has("ArrowRight")).toBe(false);
    expect(mockInputComponent.keys.has("ArrowUp")).toBe(false);
    expect(mockInputComponent.keys.has("ArrowDown")).toBe(false);
  });

  it("should throw an error if keyboard input is missing", () => {
    mockScene.input.keyboard = null;

    expect(() => new KeyboardSystem(mockScene)).toThrow(
      "Error: Missing Keyboard Input in the Scene",
    );
  });

  it("should throw an error if input component is missing", () => {
    const newMockEntity = new Entity();

    expect(() => keyboardSystem.update([newMockEntity])).toThrow(
      "Error: Missing Component Dependency",
    );
  });
});
