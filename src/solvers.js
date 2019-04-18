/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // Input: n - size of the board
  // Return: a 2D array representing a valid solution, else return null?
  // Solution has n number of pieces, less than n pieces means it fails
  // NOTE: formula for cell coordinate to integer: row x n + col = intCoord. last insertion point = (n * n) - 1
  // RECURSION!
  // Initialize an insertion point variable
  // Execute an inner recursive function
  //   If end of table, return null
  //   Else analyze table:
  //   For each row
  //     For each column
  //       If no conflict on cell, toggle cell and move to next row
  //       Else leave cell alone, move to next column
  //   If # of queens equal to n AND hasAnyConflicts is false, return matrix
  //   Else, recursively call inner function passing(++i)
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // Input: n - size of the board
  // Initialize insertion point to 0
  // findNRooksSolution is invoked, passing (n, insertion) and returns solutions to countNRoocksSolutions
  // Use Set to keep record of all solution matrices. We convert solutions into strings so Set won't contain duplicate solutions.
  // return solutionCount = Set size
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
