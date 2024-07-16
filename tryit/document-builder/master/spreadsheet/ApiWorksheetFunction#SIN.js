builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.SIN(0.5));
builder.SaveFile("xlsx", "SIN.xlsx");
builder.CloseFile();