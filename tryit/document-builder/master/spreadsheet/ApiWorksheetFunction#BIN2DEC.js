builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.BIN2DEC(1110011100));
builder.SaveFile("xlsx", "BIN2DEC.xlsx");
builder.CloseFile();