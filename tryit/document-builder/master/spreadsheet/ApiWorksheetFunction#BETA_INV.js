builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var ans = oFunction.BETA_INV(0.2, 4, 5);
oWorksheet.GetRange("B2").SetValue(ans);
builder.SaveFile("xlsx", "BETA_INV.xlsx");
builder.CloseFile();