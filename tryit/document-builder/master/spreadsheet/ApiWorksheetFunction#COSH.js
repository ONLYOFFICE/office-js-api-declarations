builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.COSH(3));
builder.SaveFile("xlsx", "COSH.xlsx");
builder.CloseFile();