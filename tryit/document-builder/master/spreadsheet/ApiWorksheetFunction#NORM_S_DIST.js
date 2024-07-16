builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.NORM_S_DIST(1.33, true));
builder.SaveFile("xlsx", "NORM_S_DIST.xlsx");
builder.CloseFile();