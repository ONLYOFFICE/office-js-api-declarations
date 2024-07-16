builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.TEXT(45.5, "$0.00"));
builder.SaveFile("xlsx", "TEXT.xlsx");
builder.CloseFile();