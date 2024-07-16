builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.BITAND(13, 25));
builder.SaveFile("xlsx", "BITAND.xlsx");
builder.CloseFile();