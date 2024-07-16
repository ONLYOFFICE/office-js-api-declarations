builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.ATANH(0.5));
builder.SaveFile("xlsx", "ATANH.xlsx");
builder.CloseFile();