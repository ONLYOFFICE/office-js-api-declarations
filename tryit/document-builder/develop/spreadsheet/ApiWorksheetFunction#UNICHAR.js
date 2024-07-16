builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.UNICHAR(378));
builder.SaveFile("xlsx", "UNICHAR.xlsx");
builder.CloseFile();