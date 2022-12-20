export default mat;
declare namespace mat {
  /**
   * Transposes an mxn array
   * @param {Array.<Array.<Number>>} matrix - of 'M x N' dimensionality
   * @return {Array.<Array.<Number>>} transposed matrix
   */
  function transpose(matrix: number[][]): number[][];
  /**
   * Get a sub-matrix of matrix
   * @param {Array.<Array.<Number>>} matrix - original matrix
   * @param {Array.<Number>} r - Array of row indices
   * @param {Number} j0 - Initial column index
   * @param {Number} j1 - Final column index
   * @returns {Array} The sub-matrix matrix(r(:),j0:j1)
   */
  function getMatrix(
    matrix: number[][],
    r: number[],
    j0: number,
    j1: number
  ): any[];
  /**
   * Get a submatrix of matrix
   * @param {Array.<Array.<Number>>} matrix - original matrix
   * @param {Number} i0 - Initial row index
   * @param {Number} i1 - Final row index
   * @param {Number} j0 - Initial column index
   * @param {Number} j1 - Final column index
   * @return {Array} The sub-matrix matrix(i0:i1,j0:j1)
   */
  function getSubMatrix(
    matrix: number[][],
    i0: number,
    i1: number,
    j0: number,
    j1: number
  ): any[];
  /**
   * Linear algebraic matrix multiplication, matrix1 * matrix2
   * @param {Array.<Array.<Number>>} matrix1
   * @param {Array.<Array.<Number>>} matrix2
   * @return {Array.<Array.<Number>>} Matrix product, matrix1 * matrix2
   */
  function mult(matrix1: number[][], matrix2: number[][]): number[][];
  /**
   * LUDecomposition to solve A*X = B, based on WEKA code
   * @param {Array.<Array.<Number>>} A - left matrix of equation to be solved
   * @param {Array.<Array.<Number>>} B - right matrix of equation to be solved
   * @return {Array.<Array.<Number>>} X so that L*U*X = B(piv,:)
   */
  function LUDecomposition(A: number[][], B: number[][]): number[][];
  /**
   * Least squares solution of A*X = B, based on WEKA code
   * @param {Array.<Array.<Number>>} A - left side matrix to be solved
   * @param {Array.<Array.<Number>>} B - a matrix with as many rows as A and any number of columns.
   * @return {Array.<Array.<Number>>} X - that minimizes the two norms of QR*X-B.
   */
  function QRDecomposition(A: number[][], B: number[][]): number[][];
}
