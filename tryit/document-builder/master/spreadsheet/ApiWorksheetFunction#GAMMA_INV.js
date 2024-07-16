
builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var ans = oFunction.GAMMA_INV(0.4, 9, 2);
oWorksheet.GetRange("B2").SetValue(ans);
builder.SaveFile("xlsx", "GAMMA_INV.xlsx");
builder.CloseFile();


