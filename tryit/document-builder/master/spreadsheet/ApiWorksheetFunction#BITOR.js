builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.BITOR(23, 10));
builder.SaveFile("xlsx", "BITOR.xlsx");
builder.CloseFile();