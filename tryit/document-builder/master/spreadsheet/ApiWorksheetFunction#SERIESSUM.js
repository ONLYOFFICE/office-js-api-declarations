builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.SERIESSUM(5, 2, 1, 3));
builder.SaveFile("xlsx", "SERIESSUM.xlsx");
builder.CloseFile();