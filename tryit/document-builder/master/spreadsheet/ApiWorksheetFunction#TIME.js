builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.TIME(23, 4, 39));
builder.SaveFile("xlsx", "TIME.xlsx");
builder.CloseFile();