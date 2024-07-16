builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.UNICODE("example"));
builder.SaveFile("xlsx", "UNICODE.xlsx");
builder.CloseFile();