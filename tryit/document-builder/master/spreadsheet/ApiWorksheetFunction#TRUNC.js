builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.TRUNC(3.14159265, 5));
builder.SaveFile("xlsx", "TRUNC.xlsx");
builder.CloseFile();