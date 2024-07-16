builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.BIN2HEX(1110011100, 4));
builder.SaveFile("xlsx", "BIN2HEX.xlsx");
builder.CloseFile();