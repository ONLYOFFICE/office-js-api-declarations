builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.VALUE("$3.50"));
builder.SaveFile("xlsx", "VALUE.xlsx");
builder.CloseFile();