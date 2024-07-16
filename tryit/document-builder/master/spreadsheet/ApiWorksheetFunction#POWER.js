builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.POWER(23, 4));
builder.SaveFile("xlsx", "POWER.xlsx");
builder.CloseFile();