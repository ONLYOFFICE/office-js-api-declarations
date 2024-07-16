builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var avg = oFunction.BETA_INV(0.2, 4, 5);
oWorksheet.GetRange("B2").SetValue(avg);
builder.SaveFile("xlsx", "BETA_INV.xlsx");
builder.CloseFile();