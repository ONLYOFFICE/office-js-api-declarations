builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.SQRT(100));
builder.SaveFile("xlsx", "SQRT.xlsx");
builder.CloseFile();