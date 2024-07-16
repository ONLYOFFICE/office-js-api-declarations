builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.CHISQ_DIST_RT(12, 10));
builder.SaveFile("xlsx", "CHISQ_DIST_RT.xlsx");
builder.CloseFile();