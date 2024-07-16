// Specify that the SUM function will be used for the subtotal:
var funcNumber = 9;
oWorksheet.GetRange("A1").SetValue(oFunction.SUBTOTAL(funcNumber, 10, 30, 50, 5));