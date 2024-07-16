builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var ans = oFunction.F_DIST_RT(10, 6, 4);
oWorksheet.GetRange("B2").SetValue(ans);
builder.SaveFile("xlsx", "F_DIST_RT.xlsx");
builder.CloseFile();