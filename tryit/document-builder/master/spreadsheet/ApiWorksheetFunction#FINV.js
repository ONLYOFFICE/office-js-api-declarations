builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var avg = oFunction.FINV(0.01, 6, 4);
oWorksheet.GetRange("B2").SetValue(avg);
builder.SaveFile("xlsx", "FINV.xlsx");
builder.CloseFile();