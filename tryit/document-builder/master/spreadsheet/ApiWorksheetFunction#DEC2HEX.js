builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.DEC2HEX(-100));
builder.SaveFile("xlsx", "DEC2HEX.xlsx");
builder.CloseFile();