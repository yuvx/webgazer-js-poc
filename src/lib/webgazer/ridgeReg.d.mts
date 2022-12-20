export default reg;
declare namespace reg {
  /**
   * Constructor of RidgeReg object,
   * this object allow to perform ridge regression
   * @constructor
   */
  function RidgeReg(): void;
  class RidgeReg {
    /**
     * Initialize new arrays and initialize Kalman filter.
     */
    init: any;
    /**
     * Add given data from eyes
     * @param {Object} eyes - eyes where extract data to add
     * @param {Object} screenPos - The current screen point
     * @param {Object} type - The type of performed action
     */
    addData: any;
    /**
     * Try to predict coordinates from pupil data
     * after apply linear regression on data set
     * @param {Object} eyesObj - The current user eyes object
     * @returns {Object}
     */
    predict(eyesObj: any): any;
    setData: any;
    /**
     * Return the data
     * @returns {Array.<Object>|*}
     */
    getData(): any;
    /**
     * The RidgeReg object name
     * @type {string}
     */
    name: string;
  }
}
