import { CameraComponent } from "../../../core/components/CameraComponent";

describe("CameraComponent", () => {
  let camera: CameraComponent;

  beforeEach(() => {
    camera = new CameraComponent();
  });

  it("should create an instance with default values", () => {
    expect(camera.zoom).toBe(1);
    expect(camera.minZoom).toBe(0.5);
    expect(camera.maxZoom).toBe(3);
    expect(camera.isDragging).toBe(false);
    expect(camera.dragStartX).toBe(0);
    expect(camera.dragStartY).toBe(0);
    expect(camera.isFixed).toBe(true);
  });

  it("should allow setting custom values through constructor", () => {
    const customCamera = new CameraComponent(2, 0.8, 4, true, 100, 200, false);

    expect(customCamera.zoom).toBe(2);
    expect(customCamera.minZoom).toBe(0.8);
    expect(customCamera.maxZoom).toBe(4);
    expect(customCamera.isDragging).toBe(true);
    expect(customCamera.dragStartX).toBe(100);
    expect(customCamera.dragStartY).toBe(200);
    expect(customCamera.isFixed).toBe(false);
  });

  it("should enforce zoom limits", () => {
    camera.zoom = 0.3;
    expect(camera.zoom).toBeLessThan(camera.minZoom);

    camera.zoom = 3.5;
    expect(camera.zoom).toBeGreaterThan(camera.maxZoom);
  });

  it("should handle dragging states correctly", () => {
    camera.isDragging = true;
    camera.dragStartX = 150;
    camera.dragStartY = 200;

    expect(camera.isDragging).toBe(true);
    expect(camera.dragStartX).toBe(150);
    expect(camera.dragStartY).toBe(200);
  });

  it("should allow toggling follow mode", () => {
    camera.isFixed = false;
    expect(camera.isFixed).toBe(false);

    camera.isFixed = true;
    expect(camera.isFixed).toBe(true);
  });
});
