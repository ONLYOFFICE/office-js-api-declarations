builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.ACOSH(3.25));
builder.SaveFile("xlsx", "ACOSH.xlsx");
builder.CloseFile();