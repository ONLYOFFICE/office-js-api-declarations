builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var avg = oFunction.BINOM_INV(678, 0.1, 0.007);
oWorksheet.GetRange("B2").SetValue(avg);
builder.SaveFile("xlsx", "BINOM_INV.xlsx");
builder.CloseFile();