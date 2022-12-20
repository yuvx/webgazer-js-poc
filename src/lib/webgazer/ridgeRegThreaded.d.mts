export default reg;
declare namespace reg {
  /**
   * Constructor of RidgeRegThreaded object,
   * it retrieve data window, and prepare a worker,
   * this object allow to perform threaded ridge regression
   * @constructor
   */
  function RidgeRegThreaded(): void;
  class RidgeRegThreaded {
    /**
     * Initialize new arrays and initialize Kalman filter.
     */
    init(): void;
    /**
     * Add given data from eyes
     * @param {Object} eyes - eyes where extract data to add
     * @param {Object} screenPos - The current screen point
     * @param {Object} type - The type of performed action
     */
    addData(eyes: any, screenPos: any, type: any): void;
    /**
     * Try to predict coordinates from pupil data
     * after apply linear regression on data set
     * @param {Object} eyesObj - The current user eyes object
     * @returns {Object}
     */
    predict(eyesObj: any): any;
    /**
     * Add given data to current data set then,
     * replace current data member with given data
     * @param {Array.<Object>} data - The data to set
     */
    setData: any;
    /**
     * Return the data
     * @returns {Array.<Object>|*}
     */
    getData(): any;
    /**
     * The RidgeRegThreaded object name
     * @type {string}
     */
    name: string;
  }
}
