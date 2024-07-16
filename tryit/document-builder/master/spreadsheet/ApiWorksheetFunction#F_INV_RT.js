builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.F_INV_RT(0.01, 6, 4));
builder.SaveFile("xlsx", "F_INV_RT.xlsx");
builder.CloseFile();