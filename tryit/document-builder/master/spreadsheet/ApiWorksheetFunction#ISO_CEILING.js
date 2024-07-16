builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.ISO_CEILING(-6.7, 2));
builder.SaveFile("xlsx", "ISO_CEILING.xlsx");
builder.CloseFile();