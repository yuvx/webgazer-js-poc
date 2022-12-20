export default webgazer;
declare namespace webgazer {
  export namespace tracker {
    export { TFFaceMesh };
  }
  export { Reg as reg };
  export { util };
  export { params };
  /**
   * Computes the size of the face overlay validation box depending on the size of the video preview window.
   * @returns {Object} The dimensions of the validation box as top, left, width, height.
   */
  export function computeValidationBoxSize(): any;
  /**
   * Starts all state related to webgazer -> dataLoop, video collection, click listener
   * If starting fails, call `onFail` param function.
   * @param {Function} onFail - Callback to call in case it is impossible to find user camera
   * @returns {*}
   */
  export function begin(onFail?: Function): Promise<typeof webgazer>;
  /**
   * Checks if webgazer has finished initializing after calling begin()
   * [20180729 JT] This seems like a bad idea for how this function should be implemented.
   * @returns {boolean} if webgazer is ready
   */
  export function isReady(): boolean;
  /**
   * Stops collection of data and predictions
   * @returns {webgazer} this
   */
  export function pause(): any;
  /**
   * Resumes collection of data and predictions if paused
   * @returns {webgazer} this
   */
  export function resume(): any;
  /**
   * stops collection of data and removes dom modifications, must call begin() to reset up
   * @return {webgazer} this
   */
  export function end(): any;
  /**
   * Stops the video camera from streaming and removes the video outlines
   * @return {webgazer} this
   */
  export function stopVideo(): any;
  /**
   * Returns if the browser is compatible with webgazer
   * @return {boolean} if browser is compatible
   */
  export function detectCompatibility(): boolean;
  /**
   * Set whether to show any of the video previews (camera, face overlay, feedback box).
   * If true: visibility depends on corresponding params (default all true).
   * If false: camera, face overlay, feedback box are all hidden
   * @param {bool} val
   * @return {webgazer} this
   */
  export function showVideoPreview(val: bool): typeof webgazer;
  /**
   * Set whether the camera video preview is visible or not (default true).
   * @param {*} bool
   * @return {webgazer} this
   */
  export function showVideo(val: any): typeof webgazer;
  /**
   * Set whether the face overlay is visible or not (default true).
   * @param {*} bool
   * @return {webgazer} this
   */
  export function showFaceOverlay(val: any): typeof webgazer;
  /**
   * Set whether the face feedback box is visible or not (default true).
   * @param {*} bool
   * @return {webgazer} this
   */
  export function showFaceFeedbackBox(val: any): any;
  /**
   * Set whether the gaze prediction point(s) are visible or not.
   * Multiple because of a trail of past dots. Default true
   * @return {webgazer} this
   */
  export function showPredictionPoints(val: any): typeof webgazer;
  /**
   * Set whether previous calibration data (from localforage) should be loaded.
   * Default true.
   *
   * NOTE: Should be called before webgazer.begin() -- see www/js/main.js for example
   *
   * @param val
   * @returns {webgazer} this
   */
  export function saveDataAcrossSessions(val: any): any;
  /**
   * Set whether a Kalman filter will be applied to gaze predictions (default true);
   * @return {webgazer} this
   */
  export function applyKalmanFilter(val: any): any;
  /**
   * Define constraints on the video camera that is used. Useful for non-standard setups.
   * This can be set before calling webgazer.begin(), but also mid stream.
   *
   * @param {Object} constraints Example constraints object:
   * { width: { min: 320, ideal: 1280, max: 1920 }, height: { min: 240, ideal: 720, max: 1080 }, facingMode: "user" };
   *
   * Follows definition here:
   * https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API/Constraints
   *
   * Note: The constraints set here are applied to the video track only. They also _replace_ any constraints, so be sure to set everything you need.
   * Warning: Setting a large video resolution will decrease performance, and may require
   */
  export function setCameraConstraints(constraints: any): Promise<void>;
  /**
   *  Set a static video file to be used instead of webcam video
   *  @param {String} videoLoc - video file location
   *  @return {webgazer} this
   */
  export function setStaticVideo(videoLoc: string): any;
  /**
   * Set the size of the video viewer
   */
  export function setVideoViewerSize(w: any, h: any): void;
  /**
   *  Add the mouse click and move listeners that add training data.
   *  @return {webgazer} this
   */
  export function addMouseEventListeners(): any;
  /**
   *  Remove the mouse click and move listeners that add training data.
   *  @return {webgazer} this
   */
  export function removeMouseEventListeners(): any;
  /**
   *  Records current screen position for current pupil features.
   *  @param {String} x - position on screen in the x axis
   *  @param {String} y - position on screen in the y axis
   *  @param {String} eventType - "click" or "move", as per eventTypes
   *  @return {webgazer} this
   */
  export function recordScreenPosition(
    x: string,
    y: string,
    eventType: string
  ): any;
  export function storePoints(x: any, y: any, k: any): void;
  /**
   * Sets the tracking module
   * @param {String} name - The name of the tracking module to use
   * @return {webgazer} this
   */
  export function setTracker(name: string): typeof webgazer;
  /**
   * Sets the regression module and clears any other regression modules
   * @param {String} name - The name of the regression module to use
   * @return {webgazer} this
   */
  export function setRegression(name: string): typeof webgazer;
  /**
   * Adds a new tracker module so that it can be used by setTracker()
   * @param {String} name - the new name of the tracker
   * @param {Function} constructor - the constructor of the curTracker object
   * @return {webgazer} this
   */
  export function addTrackerModule(name: string, constructor: Function): any;
  /**
   * Adds a new regression module so that it can be used by setRegression() and addRegression()
   * @param {String} name - the new name of the regression
   * @param {Function} constructor - the constructor of the regression object
   */
  export function addRegressionModule(
    name: string,
    constructor: Function
  ): void;
  /**
   * Adds a new regression module to the list of regression modules, seeding its data from the first regression module
   * @param {String} name - the string name of the regression module to add
   * @return {webgazer} this
   */
  export function addRegression(name: string): any;
  /**
   * Sets a callback to be executed on every gaze event (currently all time steps)
   * @param {function} listener - The callback function to call (it must be like function(data, elapsedTime))
   * @return {webgazer} this
   */
  export function setGazeListener(
    listener: (
      data: {
        x: number;
        y: number;
      },
      elapsedTime: number
    ) => unknown
  ): typeof webgazer;
  /**
   * Removes the callback set by setGazeListener
   * @return {webgazer} this
   */
  export function clearGazeListener(): typeof webgazer;
  /**
   * Set the video element canvas; useful if you want to run WebGazer on your own canvas (e.g., on any random image).
   * @return The current video element canvas
   */
  export function setVideoElementCanvas(canvas: any): any;
  /**
   * Clear data from localforage and from regs
   */
  export function clearData(): Promise<void>;
  /**
   * Returns the tracker currently in use
   * @return {tracker} an object following the tracker interface
   */
  export function getTracker(): tracker;
  /**
   * Returns the regression currently in use
   * @return {Array.<Object>} an array of regression objects following the regression interface
   */
  export function getRegression(): any[];
  /**
   * Requests an immediate prediction
   * @return {object} prediction data object
   */
  export function getCurrentPrediction(regIndex?: any): any;
  /**
   * Get the video element canvas that WebGazer uses internally on which to run its face tracker.
   * @return The current video element canvas
   */
  export function getVideoElementCanvas(): any;
  /**
   * @return array [a,b] where a is width ratio and b is height ratio
   */
  export function getVideoPreviewToCameraResolutionRatio(): number[];
  export function getStoredPoints(): any[][];
}
