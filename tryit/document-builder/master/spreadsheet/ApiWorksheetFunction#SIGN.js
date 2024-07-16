builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.SIGN(12));
builder.SaveFile("xlsx", "SIGN.xlsx");
builder.CloseFile();