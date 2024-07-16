builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.ASIN(0.25));
builder.SaveFile("xlsx", "ASIN.xlsx");
builder.CloseFile();