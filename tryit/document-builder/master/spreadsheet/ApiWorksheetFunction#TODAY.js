builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.TODAY());
builder.SaveFile("xlsx", "TODAY.xlsx");
builder.CloseFile();