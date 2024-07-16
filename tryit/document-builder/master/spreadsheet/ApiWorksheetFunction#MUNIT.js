builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.MUNIT(3));
builder.SaveFile("xlsx", "MUNIT.xlsx");
builder.CloseFile();