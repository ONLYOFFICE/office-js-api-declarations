// Specify that the values can be sorted in any order. If the exact match is not found, the function will return the <em>#N/A</em> error:
var matchType = 0;
oWorksheet.GetRange("D6").SetValue(oFunction.MATCH("Ella Tompson", oRange, matchType));