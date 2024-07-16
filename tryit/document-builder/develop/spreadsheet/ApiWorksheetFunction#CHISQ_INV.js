builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var avg = oFunction.CHISQ_INV(0.4, 10);
oWorksheet.GetRange("B2").SetValue(avg);
builder.SaveFile("xlsx", "CHISQ_INV.xlsx");
builder.CloseFile();