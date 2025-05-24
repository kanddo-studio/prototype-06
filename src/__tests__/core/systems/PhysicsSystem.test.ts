import type { Entity } from "kanji-ecs/core";
import type { InputComponent, VelocityComponent } from "kanji-ecs";

import { PhysicsComponent } from "../../../core/components/PhysicsComponent";

import { PhysicsSystem } from "../../../core/systems/PhysicsSystem";

describe("PhysicsSystem", () => {
  let physicsSystem: PhysicsSystem;
  let mockEntity: Entity;
  let inputComponent: InputComponent;
  let velocityComponent: VelocityComponent;
  let setVelocityX: jest.Mock;
  let setVelocityY: jest.Mock;

  beforeEach(() => {
    setVelocityX = jest.fn();
    setVelocityY = jest.fn();

    inputComponent = {
      keys: new Set<string>(),
    };

    velocityComponent = {
      speed: 200,
    };

    const mockBody = {
      setVelocityX,
      setVelocityY,
    } as Partial<Body>;

    const physicsComponent = {
      body: mockBody,
    } as unknown as PhysicsComponent;

    mockEntity = {
      get: jest.fn((componentName: string) => {
        if (componentName === "input") return inputComponent;
        if (componentName === "velocity") return velocityComponent;
        if (componentName === "physics") return physicsComponent;
        return undefined;
      }),
    } as unknown as Entity;

    physicsSystem = new PhysicsSystem();
  });

  it("should move left", () => {
    inputComponent.keys.add("ArrowLeft");

    physicsSystem.update([mockEntity]);

    expect(setVelocityX).toHaveBeenCalledWith(-200);
    expect(setVelocityY).toHaveBeenCalledWith(0);
  });

  it("should move right", () => {
    inputComponent.keys.add("ArrowRight");

    physicsSystem.update([mockEntity]);

    expect(setVelocityX).toHaveBeenCalledWith(200);
    expect(setVelocityY).toHaveBeenCalledWith(0);
  });

  it("should move up", () => {
    inputComponent.keys.add("ArrowUp");

    physicsSystem.update([mockEntity]);

    expect(setVelocityY).toHaveBeenCalledWith(-200);
    expect(setVelocityX).toHaveBeenCalledWith(0);
  });

  it("should move down", () => {
    inputComponent.keys.add("ArrowDown");

    physicsSystem.update([mockEntity]);

    expect(setVelocityY).toHaveBeenCalledWith(200);
    expect(setVelocityX).toHaveBeenCalledWith(0);
  });

  it("should stop when no keys are pressed", () => {
    physicsSystem.update([mockEntity]);

    expect(setVelocityX).toHaveBeenCalledWith(0);
    expect(setVelocityY).toHaveBeenCalledWith(0);
  });

  it("should throw if any component is missing", () => {
    const faultyEntity = {
      get: jest.fn().mockReturnValue(undefined),
    } as unknown as Entity;

    expect(() => physicsSystem.update([faultyEntity])).toThrow(
      "Error: Missing Component Dependency"
    );
  });
});
