builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var avg = oFunction.EXPON_DIST(0.5, 3, false);
oWorksheet.GetRange("B2").SetValue(avg);
builder.SaveFile("xlsx", "EXPON_DIST.xlsx");
builder.CloseFile();