builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.BITXOR(5, 3));
builder.SaveFile("xlsx", "BITXOR.xlsx");
builder.CloseFile();