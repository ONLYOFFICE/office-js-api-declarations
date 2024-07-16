builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.DOLLARDE(1.03, 16));
builder.SaveFile("xlsx", "DOLLARDE.xlsx");
builder.CloseFile();