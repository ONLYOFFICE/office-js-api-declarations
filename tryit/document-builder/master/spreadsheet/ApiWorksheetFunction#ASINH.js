builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.ASINH(4));
builder.SaveFile("xlsx", "ASINH.xlsx");
builder.CloseFile();