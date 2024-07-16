builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.DOLLARFR(1.1875, 16));
builder.SaveFile("xlsx", "DOLLARFR.xlsx");
builder.CloseFile();