builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.HEX2DEC("FFFFFFFF9C"));
builder.SaveFile("xlsx", "HEX2DEC.xlsx");
builder.CloseFile();