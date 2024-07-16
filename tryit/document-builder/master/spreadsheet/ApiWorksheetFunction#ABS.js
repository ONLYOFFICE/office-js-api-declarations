builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.ABS(-123.14));
builder.SaveFile("xlsx", "ABS.xlsx");
builder.CloseFile();