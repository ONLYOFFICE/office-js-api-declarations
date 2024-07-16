builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.QUOTIENT(1698, 30));
builder.SaveFile("xlsx", "QUOTIENT.xlsx");
builder.CloseFile();