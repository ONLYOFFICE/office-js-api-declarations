builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.TAN(0.5));
builder.SaveFile("xlsx", "TAN.xlsx");
builder.CloseFile();