builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.DECIMAL(101, 2));
builder.SaveFile("xlsx", "DECIMAL.xlsx");
builder.CloseFile();