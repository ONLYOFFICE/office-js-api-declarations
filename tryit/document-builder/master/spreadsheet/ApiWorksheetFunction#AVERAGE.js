builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var avg = oFunction.AVERAGE(123, 197, 46, 345, 67, 456);
oWorksheet.GetRange("B2").SetValue(avg);
builder.SaveFile("xlsx", "AVERAGE.xlsx");
builder.CloseFile();