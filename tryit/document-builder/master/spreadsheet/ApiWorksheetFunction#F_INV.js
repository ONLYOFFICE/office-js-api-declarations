builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var ans = oFunction.F_INV(0.01, 6, 4);
oWorksheet.GetRange("B2").SetValue(ans);
builder.SaveFile("xlsx", "F_INV.xlsx");
builder.CloseFile();