builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.CHISQ_DIST(2, 3, false));
builder.SaveFile("xlsx", "CHISQ_DIST.xlsx");
builder.CloseFile();