builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.MROUND(14.35, 0.4));
builder.SaveFile("xlsx", "MROUND.xlsx");
builder.CloseFile();