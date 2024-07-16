builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.ERFC(-2));
builder.SaveFile("xlsx", "ERFC.xlsx");
builder.CloseFile();