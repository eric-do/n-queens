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
  // FORMULAS
  //  intCoord = row x n + col 
  //       row = floor((intCoord - col) / n) DON'T USE
  //       row = floor(pos/n)
  //       col = intCoord - (row x n) DON'T USE
  //       col = pos % n
  //  finalInsertion = (n * n) - 1
  // RECURSION!
  // Create new board
  // Initialize an insertion point variable equal to either 0 or arguments[1]
  // Execute an inner recursive function 
  //   If end of table, return null
  //   Else analyze table:
  //   Define starting col and starting row
  //     Get starting row by calculating row = floor(pos/n)
  //     Get starting column by calculating col = pos % n
  //   Set col = insertion
  //   Loop starting row to n
  //     Create a "toggled" variable
  //     Loop each column while toggled is false and col is less than n
  //       If no conflict on cell, toggle cell, set toggled to true (move to next row)
  //       Else leave cell alone, increment column
  //     Set col = 0
  //   If # of rooks equal to n AND hasAnyConflicts is false, return matrix
  //   Else
  //     Loop each row in the table
  //       table[row].fill(0)
  //     Recursively call inner function passing(++intCoord)
  var solution = undefined; //fixme
  var board = new Board({'n' : n});
  var insertionPoint = arguments[1] || 0;
  var lastPosition = (n * n) - 1;

  return computeSolution();

  function computeSolution() {
    if (insertionPoint > lastPosition && insertionPoint !== 0) {
      return null;
    } else {
      var toggleCounter = 0;
      var col = insertionPoint % n;
      var row = Math.floor(insertionPoint/n);
      for (var i = 0; i < n; i++) {
        var toggled = false;
        while (!toggled && col < n) {
          board.togglePiece(i, col);
          if (board.hasRowConflictAt(i) === false && board.hasColConflictAt(col) === false) {
            toggleCounter++;
            toggled = true;
          } else {
            board.togglePiece(i, col);
            col++;
          }
        }
        col = 0;
      }
      
      if (toggleCounter === n && board.hasAnyRowConflicts() === false && board.hasAnyColConflicts() === false) {
        return board.rows();
      } else {
        for (var i = 0; i < n; i++) {
          board.rows()[i].fill(0);
        }
        insertionPoint++;
        return computeSolution();
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // Input: n - size of the board
  // Return: number of solutions
  // Create a new board using n
  // Point arr to board.rows() 
  //  RecursiveFunction
  //   For each board column in currentRow
  //     If column has no conflict
  //       Toggle the row/col
  //       If we are on the last row
  //         Increment solution count
  //         Clear the entire current row
  //       Else pass current matrix and ++currentRow to recursiveFunction
  //     Else proceed to next column
  //     

  var board = new Board({'n': n});
  var matrix = board.rows();
  var solutionCounter = 0;
  
  recursiveCount(0);
  return solutionCounter;
  
  function recursiveCount(currentRow) {
    if (currentRow === n) { 
      return 0; 
    }
    
    matrix[currentRow].forEach((square, column) => {
      board.togglePiece(currentRow, column);
      if (!board.hasRowConflictAt(currentRow) && !board.hasColConflictAt(column)) {
        if (currentRow === n - 1) {
          solutionCounter++;
          matrix[currentRow].fill(0);
        } else {
          recursiveCount(currentRow + 1);
        }
      }
      matrix[currentRow].fill(0);
    });
  }
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({'n': n});
  var matrix = board.rows();
  var solution = [[]];
  if (n === 0) { return {'n':0}; }
  
  recursiveMatrix(0);
  return matrix;
  
  function recursiveMatrix(currentRow) {
    if (currentRow > n) { 
      return 0; 
    }
    
    matrix[currentRow].forEach((square, column) => {
      var intCoord = currentRow * n + column;
      board.togglePiece(currentRow, column);
      if (!board.hasAnyQueensConflicts()) {
        if (currentRow === n - 1) {
          return matrix;
        } else {
          recursiveMatrix(currentRow + 1);
        }
      }
      matrix[currentRow].fill(0);
    });
  }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({'n': n});
  var matrix = board.rows();
  var solutionCounter = 0;
  
  if (n === 0) { return 1; }
  
  recursiveCount(0);
  return solutionCounter;
  
  function recursiveCount(currentRow) {
    if (currentRow === n) { 
      return 0; 
    }
    
    matrix[currentRow].forEach((square, column) => {
      var intCoord = currentRow * n + column;
      board.togglePiece(currentRow, column);
      if (!board.hasAnyQueensConflicts()) {
        if (currentRow === n - 1) {
          solutionCounter++;
          matrix[currentRow].fill(0);
        } else {
          recursiveCount(currentRow + 1);
        }
      }
      matrix[currentRow].fill(0);
    });
  }
};
