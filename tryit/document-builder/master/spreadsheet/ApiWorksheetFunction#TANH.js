builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.TANH(6));
builder.SaveFile("xlsx", "TANH.xlsx");
builder.CloseFile();