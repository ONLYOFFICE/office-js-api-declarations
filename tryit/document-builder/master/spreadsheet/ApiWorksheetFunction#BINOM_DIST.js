builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.BINOM_DIST(50, 67, 0.45, false));
builder.SaveFile("xlsx", "BINOM_DIST.xlsx");
builder.CloseFile();