import { PhysicsComponent } from "../../../core/components/PhysicsComponent";

describe("PhysicsComponent", () => {
  let mockSprite: any;
  let mockBody: any;
  let physics: PhysicsComponent;

  beforeEach(() => {
    mockBody = {
      setCollideWorldBounds: jest.fn(),
    };

    mockSprite = {
      body: mockBody,
      setPosition: jest.fn(),
    };

    physics = new PhysicsComponent(mockSprite, 50, 100);
  });

  it("should assign the body correctly", () => {
    expect(physics.body).toBe(mockBody);
  });

  it("should enable world bounds collision", () => {
    expect(mockBody.setCollideWorldBounds).toHaveBeenCalledWith(true);
  });

  it("should set the initial position", () => {
    expect(mockSprite.setPosition).toHaveBeenCalledWith(50, 100);
  });
});
