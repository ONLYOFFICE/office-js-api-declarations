builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.LOG10(56));
builder.SaveFile("xlsx", "LOG10.xlsx");
builder.CloseFile();