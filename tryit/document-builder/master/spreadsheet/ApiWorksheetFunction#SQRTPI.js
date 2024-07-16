builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.SQRTPI(5));
builder.SaveFile("xlsx", "SQRTPI.xlsx");
builder.CloseFile();