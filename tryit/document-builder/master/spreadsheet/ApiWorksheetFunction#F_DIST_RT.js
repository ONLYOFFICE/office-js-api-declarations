builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var avg = oFunction.F_DIST_RT(10, 6, 4);
oWorksheet.GetRange("B2").SetValue(avg);
builder.SaveFile("xlsx", "F_DIST_RT.xlsx");
builder.CloseFile();