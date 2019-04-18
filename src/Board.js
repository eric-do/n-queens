// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // current row at rowIndex
      var row = this.get(rowIndex);
      // looking through row at rowIndex
      // use indexof to check for first occurrence, then indexof again for an occurrence after the first ocurrence within the same row
      // if there are 2 occurrences within a row, then we return true;
      firstPiece = row.indexOf(1) //looking for placement of rook/queen
      if (row.indexOf(1, firstPiece + 1) !== -1) {//looking for placement of other pieces after first placement
        return true;
      }

      return false; // fixme
    },  

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // Input: nothing
      // Return: boolean - true if any rows contain conflict, false if not
      // Get board from rows function
      // For each row
      //  If row has conflict, return true
      // Return false
      var n = this.get('n');
      
      for (var i = 0; i < n; i++) {
        if (this.hasRowConflictAt(i) === true) {
          return this.hasRowConflictAt(i);
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // Input: column Index to search
      // Return: boolean - true if conflict found, false if not
      // Retrieve entire matrix
      // At the column index, loop each row
      //   arr[i][index]; -> see if conflicts occur during loop
      //   Increment a queen counter
      // Return true if counter > 1, false if not
     
      var n = this.get('n');
      var counter = 0;
      
      for (var i = 0; i < n; i++) {
        if (this.get(i)[colIndex] === 1) {
          counter++;
        }
      }
      return counter > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // Input: nothing
      // Return: boolean - true if there are conflicts, false if not
      // Loop n
      //  Call hasColConflictAt(i)
      //  if any column had a conflict, return true
      // false if no conflicts found
      
      var n = this.get('n');
      for (var i = 0; i < n; i++) {
        if (this.hasColConflictAt(i) === true) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(index) {
      // Input: index to start diagonal analysis
      // Output: boolean - true if conflict found, false if not
      // Initialize counter to 0
      // If (index >= 0) starting position = (0, index)
      // If (index < 0)  starting position = (index, 0)
      // Loop length of matrix starting at index
      //   If queen, incremenent counter
      //   increment column
      // Return counter > 1
      var counter = 0;
      var position = index >= 0 ? [0, index] : [-index, 0];
      var row = position[0];
      var col = position[1];
      var n = this.get('n');
      
      for (var i = row; i < n; i++) {
        if (this.get(i)[col] === 1) {
          counter++;
        }
        col++;
      }
      return counter > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // Input: nothing
      // Return: boolean - true if there are conflicts, false if no conflics
      // Loop -n to n
      //  if (hasMajorDiagonalConflictAt returns true) return true
      // Return false
      var n =  this.get('n');
      for (var i = -n; i < n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // Input: index
      // Return: boolean - true if there are conflicts, false if no conflicts
      // If (index > n) starting position is (i - col, n - 1)
      // Else starting position is (0, index)
      // Loop backwards while column >= 0
      //  If queen, increment counter
      //  Increment row
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // Input: nothing
      // Return: boolean - true if conflict found, false if not
      // Loop 0 to n
      //  If hasMinorDiagonalConflictAt is true, return true
      // Return false
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
