builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.ECMA_CEILING(1.567, 0.1));
builder.SaveFile("xlsx", "ECMA_CEILING.xlsx");
builder.CloseFile();