builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var avg = oFunction.CONFIDENCE(0.5, 57, 8);
oWorksheet.GetRange("B2").SetValue(avg);
builder.SaveFile("xlsx", "CONFIDENCE.xlsx");
builder.CloseFile();