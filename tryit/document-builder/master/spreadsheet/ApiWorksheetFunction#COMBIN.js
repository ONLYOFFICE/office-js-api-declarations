builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.COMBIN(67, 7));
builder.SaveFile("xlsx", "COMBIN.xlsx");
builder.CloseFile();