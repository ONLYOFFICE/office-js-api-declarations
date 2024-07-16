builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.LOG(56, 5));
builder.SaveFile("xlsx", "LOG.xlsx");
builder.CloseFile();