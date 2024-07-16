builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.INT(2.3));
builder.SaveFile("xlsx", "INT.xlsx");
builder.CloseFile();