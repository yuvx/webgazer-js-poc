export default pupil;
declare namespace pupil {
  export { getPupils };
}
/**
 * Given an object with two eye patches it finds the location of the detected pupils
 * @param  {Object} eyesObj - left and right detected eye patches
 * @return {Object} eyesObj - updated eye patches with information about pupils' locations
 */
declare function getPupils(eyesObj: any): any;
