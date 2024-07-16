builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var avg = oFunction.AVERAGEA(78, 98, 46, 123, 45);
oWorksheet.GetRange("B2").SetValue(avg);
builder.SaveFile("xlsx", "AVERAGEA.xlsx");
builder.CloseFile();