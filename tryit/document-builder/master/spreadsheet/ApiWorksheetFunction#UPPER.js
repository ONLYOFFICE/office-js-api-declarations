builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.UPPER("Online Office"));
builder.SaveFile("xlsx", "UPPER.xlsx");
builder.CloseFile();