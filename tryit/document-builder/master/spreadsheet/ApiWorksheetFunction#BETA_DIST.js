builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var avg = oFunction.BETA_DIST(0.4, 4, 5, false);
oWorksheet.GetRange("B2").SetValue(avg);
builder.SaveFile("xlsx", "BETA_DIST.xlsx");
builder.CloseFile();