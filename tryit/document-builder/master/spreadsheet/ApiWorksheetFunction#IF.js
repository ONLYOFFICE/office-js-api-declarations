builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.IF("12<100", 0, 1));
builder.SaveFile("xlsx", "IF.xlsx");
builder.CloseFile();