builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.DELTA(23, 24));
builder.SaveFile("xlsx", "DELTA.xlsx");
builder.CloseFile();