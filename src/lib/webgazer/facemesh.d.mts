export default TFFaceMesh;
declare class TFFaceMesh {
  positionsArray:
    | import("@tensorflow/tfjs-core").Tensor2D
    | import("@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh/util").Coords3D;
  /**
   * Isolates the two patches that correspond to the user's eyes
   * @param  {Object} video - the video element itself
   * @param  {Canvas} imageCanvas - canvas corresponding to the webcam stream
   * @param  {Number} width - of imageCanvas
   * @param  {Number} height - of imageCanvas
   * @return {Object} the two eye-patches, first left, then right eye
   */
  getEyePatches(
    video: any,
    imageCanvas: Canvas,
    width: number,
    height: number
  ): any;
  predictionReady: boolean;
  /**
   * Returns the positions array corresponding to the last call to getEyePatches.
   * Requires that getEyePatches() was called previously, else returns null.
   */
  getPositions():
    | import("@tensorflow/tfjs-core").Tensor2D
    | import("@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh/util").Coords3D;
  /**
   * Reset the tracker to default values
   */
  reset(): void;
  /**
   * Draw TF_FaceMesh_Overlay
   */
  drawFaceOverlay(ctx: any, keypoints: any): void;
  /**
   * The TFFaceMesh object name
   * @type {string}
   */
  name: string;
}
